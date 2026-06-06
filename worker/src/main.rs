mod cloudinary;
mod config;
mod consumer;
mod handlers;
mod models;

use dotenvy::dotenv;
use tracing::info;
use tracing_subscriber::EnvFilter;

use crate::config::Config;
use crate::consumer::run_worker_pool;

#[tokio::main]
async fn main() {
    // Load .env file (if present)
    dotenv().ok();

    // Initialize structured logging.
    // Set RUST_LOG=info (or debug/trace) to control verbosity.
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")),
        )
        .init();

    info!("Starting video processing worker...");

    let config = Config::from_env();
    info!(workers = config.worker_count, "Config loaded ✓");

    if let Err(e) = run_worker_pool(config).await {
        tracing::error!("Worker pool exited with error: {}", e);
        std::process::exit(1);
    }
}
