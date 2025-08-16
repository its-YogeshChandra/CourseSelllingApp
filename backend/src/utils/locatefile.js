import fs from "fs-extra";
import path from "path";

const listMp4FilesInDir = (dirPath) => {
  const allFiles = fs.readdirSync(dirPath); // list of all items in that folder
  const mp4Files = allFiles.filter((file) => {
    return path.extname(file).toLowerCase() === ".mp4";
  });
  return mp4Files; // array of file names only
};

export { listMp4FilesInDir };
