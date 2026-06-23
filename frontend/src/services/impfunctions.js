import { nanoid } from "@reduxjs/toolkit";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { courseServices } from "./courseService.js";

//rewriting the upload logic 
const handleVideoUpload = async (data, keysArr) => {

  for (let k = 0; k < keysArr.length; k++) {
    const key = keysArr[k];
    const value = data[key];

    if (!Array.isArray(value)) {
      continue;
    }

    const uploadedResults = [];
    const isVideo = key === "videos";

    for (let f = 0; f < value.length; f++) {
      const file = value[f];

      if (!(file instanceof File)) {
        continue;
      }

      if (isVideo) {
        // ── Chunked upload for videos ──
        const fileSize = file.size;
        const chunkSize = getOptimalChunkSize(fileSize);
        const totalChunks = Math.ceil(fileSize / chunkSize);
        const uniqueUploadId = nanoid();
        const fileName = `courses/${key}/${file.name}_${nanoid(6)}`;

        const chunkUrls = [];

        for (let i = 0; i < totalChunks; i++) {
          const start = i * chunkSize;
          const end = Math.min(start + chunkSize, fileSize);
          const chunkBlob = file.slice(start, end);
          const contentRange = `bytes ${start}-${end - 1}/${fileSize}`;

          const secureUrl = await courseServices.uploadToMediaBucket(
            chunkBlob, fileName, "video", contentRange, uniqueUploadId
          );
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

        const secureUrl = await courseServices.uploadToMediaBucket(
          file, fileName, resourceType
        );

        uploadedResults.push({
          title: file.name,
          url: secureUrl,
        });
      }
    }

    data[key] = uploadedResults;
  }

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
