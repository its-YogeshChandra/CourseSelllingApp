use std::env;

/// All environment-based configuration for the worker.
/// Call `Config::from_env()` once at startup.
#[derive(Debug, Clone)]
pub struct Config {
    pub rabbitmq_url: String,
    pub mongodb_url: String,
    pub mongodb_db_name: String,
    pub cloudinary_cloud_name: String,
    pub cloudinary_api_key: String,
    pub cloudinary_api_secret: String,
    pub worker_count: usize,
}

impl Config {
    pub fn from_env() -> Self {
        Self {
            rabbitmq_url: env::var("RABBITMQ_URL")
                .expect("RABBITMQ_URL must be set"),
            mongodb_url: env::var("WORKER_MONGODB_URL")
                .expect("WORKER_MONGODB_URL must be set"),
            mongodb_db_name: env::var("MONGODB_DB_NAME")
                .unwrap_or_else(|_| "CourseSellingDB".to_string()),
            cloudinary_cloud_name: env::var("CLOUDINARY_CLOUD_NAME")
                .expect("CLOUDINARY_CLOUD_NAME must be set"),
            cloudinary_api_key: env::var("CLOUDINARY_API_KEY")
                .expect("CLOUDINARY_API_KEY must be set"),
            cloudinary_api_secret: env::var("CLOUDINARY_API_SECRET")
                .expect("CLOUDINARY_API_SECRET must be set"),
            worker_count: env::var("WORKER_COUNT")
                .unwrap_or_else(|_| "2".to_string())
                .parse::<usize>()
                .unwrap_or(2),
        }
    }
}
