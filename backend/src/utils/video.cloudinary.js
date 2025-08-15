import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "video-cloudinary",
  api_key: process.env.CLOUDINARY_2_API_KEY,
  api_secret: process.env.CLOUDINARY_2_API_SECRET,
});

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
      // fs.unlinkSync(localfilePath);
      return response;
    }
  } catch (error) {
    // fs.unlinkSync(localfilePath);
    return error;
  }
};

export { uploadonCloudinary };