import { nanoid } from "@reduxjs/toolkit";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { courseServices } from "./courseService.js";

//rewriting the upload logic 
const handleVideoUpload = async (data, keysArr) => {
  console.log("[handleVideoUpload] Called with keys:", keysArr);
  console.log("[handleVideoUpload] Input data:", data);

  for (let k = 0; k < keysArr.length; k++) {
    const key = keysArr[k];
    const value = data[key];

    if (!Array.isArray(value)) {
      console.log(`[handleVideoUpload] Key "${key}" is not an array — skipping`);
      continue;
    }

    const uploadedResults = [];
    const isVideo = key === "videos";

    for (let f = 0; f < value.length; f++) {
      const file = value[f];

      if (!(file instanceof File)) {
        console.log(`[handleVideoUpload] Key "${key}" item ${f} is not a File — skipping`);
        continue;
      }

      if (isVideo) {
        // ── Chunked upload for videos ──
        const fileSize = file.size;
        const chunkSize = getOptimalChunkSize(fileSize);
        const totalChunks = Math.ceil(fileSize / chunkSize);
        const uniqueUploadId = nanoid();
        const fileName = `courses/${key}/${file.name}_${nanoid(6)}`;

        console.log(`[Chunked] "${file.name}", ${(fileSize / 1024 / 1024).toFixed(2)}MB, ${totalChunks} chunks`);

        const chunkUrls = [];

        for (let i = 0; i < totalChunks; i++) {
          const start = i * chunkSize;
          const end = Math.min(start + chunkSize, fileSize);
          const chunkBlob = file.slice(start, end);
          const contentRange = `bytes ${start}-${end - 1}/${fileSize}`;

          const secureUrl = await courseServices.uploadToMediaBucket(
            chunkBlob, fileName, "video", contentRange, uniqueUploadId
          );
          console.log(`[Chunked] Chunk ${i + 1}/${totalChunks}:`, secureUrl);
          chunkUrls.push(secureUrl);
        }

        uploadedResults.push({
          title: file.name,
          url: chunkUrls,
        });

      } else {
        // ── Normal single upload for images and notes ──
        const resourceType = key === "images" ? "image" : "raw";
        const fileName = `courses/${key}/${file.name}_${nanoid(6)}`;

        console.log(`[Single] "${file.name}" as ${resourceType}`);

        const secureUrl = await courseServices.uploadToMediaBucket(
          file, fileName, resourceType
        );

        console.log(`[Single] Uploaded:`, secureUrl);

        uploadedResults.push({
          title: file.name,
          url: secureUrl,
        });
      }
    }

    data[key] = uploadedResults;
  }

  console.log("[handleVideoUpload] Final data:", data);
  return data;
}

/**
 * Calculates the optimal chunk size based on file size.
 * Minimum size: 5MB. Maximum size: 100MB.
 * @param {number} totalBytes - The total size of the file in bytes.
 * @returns {number} - The optimal chunk size in bytes.
 */
function getOptimalChunkSize(totalBytes) {
  const MB = 1024 * 1024;
  
  if (totalBytes <= 50 * MB) return 5 * MB;
  if (totalBytes <= 500 * MB) return 10 * MB;
  if (totalBytes <= 2000 * MB) return 25 * MB;
  
  return 50 * MB; // For anything massive, cap at 50-100MB
}



export { handleVideoUpload };
