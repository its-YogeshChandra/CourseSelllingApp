import fs from "fs-extra";
import { exec } from "child_process";

const downloadVideo = ( outputPath, url) => {
  return new Promise((resolve, reject) => {
    exec(`wget -P ${outputPath} "${url}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error downloading video: ${error.message}`);
        reject(new Error(`Failed to download video: ${stderr}`));
      } else {
        console.log(`Video downloaded successfully: ${stdout}`);
        resolve(outputPath);
      }
    });
  });
};

export { downloadVideo };
