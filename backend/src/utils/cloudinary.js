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
      // fs.unlinkSync(localfilePath);
      return response;
    }
  } catch (error) {
    // fs.unlinkSync(localfilePath);
    return error;
  }
};

//making function from fetching data from cloudinary using public id
const fetchFromCloudinary = async (path) => {
  try {
    const response = await cloudinary.api.resource(path, options);
    console.log("Response from Cloudinary:", response);
    return response;
  } catch (error) {
    console.error("Error fetching from Cloudinary:", error);
    return error;
  }
};

export { uploadonCloudinary, fetchFromCloudinary };
