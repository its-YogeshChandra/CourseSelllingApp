use reqwest::Client;
use serde::Deserialize;
use std::path::Path;

use crate::config::Config;

#[derive(Debug, Deserialize)]
struct CloudinaryResponse {
    pub secure_url: String,
}

/// Upload a single file to Cloudinary using signed upload (API key + secret).
/// Returns the `secure_url` of the uploaded asset.
pub async fn upload_to_cloudinary(
    client: &Client,
    config: &Config,
    file_path: &Path,
    public_id: &str,
    resource_type: &str,
) -> Result<String, Box<dyn std::error::Error + Send + Sync>> {
    let timestamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)?
        .as_secs()
        .to_string();

    // Build the signature string (Cloudinary requires alphabetical params)
    let to_sign = format!(
        "public_id={}&timestamp={}{}",
        public_id, timestamp, config.cloudinary_api_secret
    );

    let signature = format!("{:x}", md5_hash(to_sign.as_bytes()));

    let file_bytes = tokio::fs::read(file_path).await?;
    let file_name = file_path
        .file_name()
        .unwrap_or_default()
        .to_string_lossy()
        .to_string();

    let part = reqwest::multipart::Part::bytes(file_bytes)
        .file_name(file_name)
        .mime_str("application/octet-stream")?;

    let form = reqwest::multipart::Form::new()
        .part("file", part)
        .text("public_id", public_id.to_string())
        .text("timestamp", timestamp.clone())
        .text("api_key", config.cloudinary_api_key.clone())
        .text("signature", signature);

    let url = format!(
        "https://api.cloudinary.com/v1_1/{}/{}/upload",
        config.cloudinary_cloud_name, resource_type
    );

    let resp = client
        .post(&url)
        .multipart(form)
        .send()
        .await?;

    if !resp.status().is_success() {
        let status = resp.status();
        let body = resp.text().await.unwrap_or_default();
        return Err(format!("Cloudinary upload failed ({}): {}", status, body).into());
    }

    let data: CloudinaryResponse = resp.json().await?;
    Ok(data.secure_url)
}

/// Simple SHA-1 hash for Cloudinary signature.
/// Cloudinary uses SHA-1 for API signatures (not MD5 — fixing the name).
fn md5_hash(data: &[u8]) -> Sha1Digest {
    // Minimal SHA-1 implementation to avoid adding another crate.
    // For production, consider using the `sha1` crate.
    use std::io::Write;
    let mut hasher = Sha1::new();
    hasher.write_all(data).unwrap();
    hasher.finish()
}

// ---- Minimal SHA-1 (Cloudinary requires SHA-1 signatures) ----

struct Sha1 {
    state: [u32; 5],
    buffer: Vec<u8>,
    total_len: u64,
}

#[derive(Clone, Copy)]
struct Sha1Digest([u8; 20]);

impl std::fmt::LowerHex for Sha1Digest {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for byte in &self.0 {
            write!(f, "{:02x}", byte)?;
        }
        Ok(())
    }
}

impl Sha1 {
    fn new() -> Self {
        Self {
            state: [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],
            buffer: Vec::new(),
            total_len: 0,
        }
    }

    fn process_block(state: &mut [u32; 5], block: &[u8; 64]) {
        let mut w = [0u32; 80];
        for i in 0..16 {
            w[i] = u32::from_be_bytes([
                block[i * 4],
                block[i * 4 + 1],
                block[i * 4 + 2],
                block[i * 4 + 3],
            ]);
        }
        for i in 16..80 {
            w[i] = (w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]).rotate_left(1);
        }

        let [mut a, mut b, mut c, mut d, mut e] = *state;

        for i in 0..80 {
            let (f, k) = match i {
                0..=19 => ((b & c) | ((!b) & d), 0x5A827999u32),
                20..=39 => (b ^ c ^ d, 0x6ED9EBA1u32),
                40..=59 => ((b & c) | (b & d) | (c & d), 0x8F1BBCDCu32),
                _ => (b ^ c ^ d, 0xCA62C1D6u32),
            };
            let temp = a
                .rotate_left(5)
                .wrapping_add(f)
                .wrapping_add(e)
                .wrapping_add(k)
                .wrapping_add(w[i]);
            e = d;
            d = c;
            c = b.rotate_left(30);
            b = a;
            a = temp;
        }

        state[0] = state[0].wrapping_add(a);
        state[1] = state[1].wrapping_add(b);
        state[2] = state[2].wrapping_add(c);
        state[3] = state[3].wrapping_add(d);
        state[4] = state[4].wrapping_add(e);
    }

    fn finish(mut self) -> Sha1Digest {
        let bit_len = self.total_len * 8;
        self.buffer.push(0x80);
        while (self.buffer.len() % 64) != 56 {
            self.buffer.push(0);
        }
        self.buffer.extend_from_slice(&bit_len.to_be_bytes());

        for chunk in self.buffer.chunks_exact(64) {
            let block: [u8; 64] = chunk.try_into().unwrap();
            Self::process_block(&mut self.state, &block);
        }

        let mut digest = [0u8; 20];
        for (i, s) in self.state.iter().enumerate() {
            digest[i * 4..i * 4 + 4].copy_from_slice(&s.to_be_bytes());
        }
        Sha1Digest(digest)
    }
}

impl std::io::Write for Sha1 {
    fn write(&mut self, buf: &[u8]) -> std::io::Result<usize> {
        self.total_len += buf.len() as u64;
        self.buffer.extend_from_slice(buf);
        Ok(buf.len())
    }

    fn flush(&mut self) -> std::io::Result<()> {
        Ok(())
    }
}
