import { v2 as cloudinary } from "cloudinary";

// creating cloudinary configuration
cloudinary.config();
const options = {
  use_filename: true,
  resource_type: "auto",
};

// controller for uploading files to cloudinary
const uploadonCloudinary = async (localfilePath) => {
  try {
    const response = !localfilePath
      ? null
      : await cloudinary.uploader.upload(localfilePath, options);

    if (response) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export { uploadonCloudinary };
