use futures_lite::StreamExt;
use lapin::{
    options::*, types::FieldTable, Channel, Connection, ConnectionProperties,
};
use mongodb::bson::Document;
use mongodb::Collection;
use reqwest::Client;
use tracing::{error, info, warn};

use crate::config::Config;
use crate::handlers::video::process_video;
use crate::models::JobPayload;

const QUEUE_NAME: &str = "videoProcessing";

/// Spin up `worker_count` concurrent consumers, all reading from the same queue.
/// RabbitMQ round-robins messages across consumers automatically.
pub async fn run_worker_pool(config: Config) -> Result<(), Box<dyn std::error::Error>> {
    // Shared resources — created once, cloned into each worker task
    let http = Client::new();

    let mongo_client = mongodb::Client::with_uri_str(&config.mongodb_url).await?;
    let db = mongo_client.database(&config.mongodb_db_name);
    let lessons_col: Collection<Document> = db.collection("lessons");

    info!("MongoDB connected ✓ (db: {})", config.mongodb_db_name);

    let conn = Connection::connect(&config.rabbitmq_url, ConnectionProperties::default()).await?;
    info!("RabbitMQ connected ✓");

    let mut handles = Vec::new();

    for worker_id in 0..config.worker_count {
        let channel = conn.create_channel().await?;

        // prefetch = 1 per worker — finish one job before grabbing the next
        channel
            .basic_qos(1, BasicQosOptions::default())
            .await?;

        // Declare queue (idempotent — safe to call from every worker)
        channel
            .queue_declare(
                QUEUE_NAME.into(),
                QueueDeclareOptions { durable: true, ..Default::default() },
                FieldTable::default(),
            )
            .await?;

        let config = config.clone();
        let http = http.clone();
        let lessons_col = lessons_col.clone();

        let handle = tokio::spawn(async move {
            info!(worker_id, "Worker started — waiting for jobs on '{}'", QUEUE_NAME);

            if let Err(e) = consume_loop(worker_id, &channel, &config, &http, &lessons_col).await {
                error!(worker_id, "Worker crashed: {}", e);
            }
        });

        handles.push(handle);
    }

    info!("All {} workers running", config.worker_count);

    // Block until all workers finish (they shouldn't unless RabbitMQ dies)
    for h in handles {
        let _ = h.await;
    }

    Ok(())
}

/// Single worker's consume loop — runs forever, processing one job at a time.
async fn consume_loop(
    worker_id: usize,
    channel: &Channel,
    config: &Config,
    http: &Client,
    lessons_col: &Collection<Document>,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let tag = format!("worker-{}", worker_id);

    let mut consumer = channel
        .basic_consume(
            QUEUE_NAME.into(),
            tag.as_str().into(),
            BasicConsumeOptions::default(),
            FieldTable::default(),
        )
        .await?;

    while let Some(delivery_result) = consumer.next().await {
        let delivery = match delivery_result {
            Ok(d) => d,
            Err(e) => {
                error!(worker_id, "Consumer error: {}", e);
                continue;
            }
        };

        let payload_str = String::from_utf8_lossy(&delivery.data);
        info!(worker_id, "Received job: {}", payload_str);

        let job: JobPayload = match serde_json::from_slice(&delivery.data) {
            Ok(j) => j,
            Err(e) => {
                error!(worker_id, "Failed to parse job payload: {} — NACKing", e);
                // Don't requeue malformed messages — they'll never parse
                let _ = delivery
                    .nack(BasicNackOptions { requeue: false, ..Default::default() })
                    .await;
                continue;
            }
        };

        match process_video(&job, config, http, lessons_col).await {
            Ok(result) => {
                info!(
                    worker_id,
                    title = %result.title,
                    segments = result.segment_urls.len(),
                    "Job completed ✓ — ACKing"
                );
                let _ = delivery.ack(BasicAckOptions::default()).await;
            }
            Err(e) => {
                error!(
                    worker_id,
                    title = %job.title,
                    lesson_id = %job.lesson_id,
                    "Job failed: {} — NACKing with requeue",
                    e
                );
                // Requeue so another worker can retry
                let _ = delivery
                    .nack(BasicNackOptions { requeue: true, ..Default::default() })
                    .await;
            }
        }
    }

    warn!(worker_id, "Consumer stream ended");
    Ok(())
}
