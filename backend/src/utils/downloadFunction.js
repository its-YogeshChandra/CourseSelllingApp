import { exec } from "child_process";

// function to download a video using wget
const downloadVideo = (url, downloadfolder) => {
  return new Promise((resolve, reject) => {
    
    // execute the wget command to downlaod the video 
    exec(`wget -P "${downloadfolder}" "${url}"`, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Failed to download video: ${stderr}`));
      } else {
        resolve("video downloaded successfully" + stdout);   // Return full path instead of just folder
      }
    });
  });
};


export { downloadVideo };
