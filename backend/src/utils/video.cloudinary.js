import { v2 as cloudinary } from "cloudinary";

// creating cloudinary configuration
cloudinary.config({
  cloud_name: "video-cloudinary",
  api_key: process.env.CLOUDINARY_2_API_KEY,
  api_secret: process.env.CLOUDINARY_2_API_SECRET,
});

// options for uploading files
const options = {
  use_filename: true,
  resource_type: "auto",
};

// controller for uploading files to cloudinary
const videoUploadToCloudinary = async (localfilePath) => {
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

export { videoUploadToCloudinary };
