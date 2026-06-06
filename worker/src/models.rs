use serde::{Deserialize, Serialize};

/// Payload received from the JS backend via RabbitMQ.
/// Matches the message shape: { title, url, lesson_id }
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JobPayload {
    pub title: String,
    pub url: String,
    pub lesson_id: String,
}

/// Result of HLS processing — one entry per segment + the playlist.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HlsSegment {
    pub name: String,
    pub cloud_url: String,
}

/// Full result from processing a single video job.
#[derive(Debug, Clone)]
pub struct VideoProcessingResult {
    pub title: String,
    pub playlist_url: String,
    pub segment_urls: Vec<String>,
}