use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct JobPayload {
    pub job_id: String,
    pub lesson_id: String,
    pub format: String,
    pub url: String 
}