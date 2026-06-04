//writing a custom background worker 
mod consumer;
mod handlers;
mod models;
use tokio;
use lapin :: {
   BasicProperties, Connection, ConnectionProperties, Result, options::*, types::FieldTable
};
use dotenvy::dotenv;
use std::env;
//conect to the rabbit mq using lapin 

#[tokio::main]
async fn main() {
  dotenv().ok();
    let conn_addr = std::env::var("RABBITMQ_URL").expect("RABBITMQ_URL must be set");
    let runtime = lapin::runtime::default_runtime().unwrap();

    let connection = Connection::connect(&conn_addr , ConnectionProperties::default()).await.unwrap();
    let channel = connection.create_channel().await.unwrap();

    let mut consumer = channel.basic_consume("videoProcessing".into(), "my-worker".into(),BasicConsumeOptions::default(), FieldTable::default());
     
    }
