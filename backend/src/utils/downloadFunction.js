import fs from "fs-extra";
import { exec } from "child_process";

const downloadVideo = (url) => {
  return new Promise((resolve, reject) => {
    exec(`wget "${url}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error downloading video: ${error.message}`);
        reject(new Error(`Failed to download video: ${stderr}`));
      } else {
        resolve("video downloaded successfully" + stdout); // Return full path instead of just folder
      }
    });
  });
};

export { downloadVideo };
