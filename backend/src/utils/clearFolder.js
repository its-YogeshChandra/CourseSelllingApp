import fs from "fs";
import path from "path";

/**
 * Deletes all files in a specified folder.
 * @param {string} folderPath - Absolute or relative path to the folder
 */
const deleteAllFilesInFolder = (folderPath) => {
  try {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        fs.unlinkSync(filePath);
      }
    }
    console.log(`✅ All files deleted from: ${folderPath}`);
  } catch (err) {
    console.error(`❌ Error deleting files:`, err.message);
  }
};
export {deleteAllFilesInFolder}