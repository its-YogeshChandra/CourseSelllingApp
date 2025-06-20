import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config();
const options = {
  use_filename: true,
  resource_type: "auto",
};

const uploadonCloudinary = async (localfilePath) => {
  try {
    const response = !localfilePath
      ? null
      : await cloudinary.uploader.upload(localfilePath, options);

    if (response) {
      console.log(`file is successfully uploaded ${response}`);
      fs.unlinkSync(localfilePath);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localfilePath);
    return error;
  }
};

export { uploadonCloudinary };
