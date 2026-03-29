const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config({});

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

exports.uploadMedia = async (file) => {
  console.log("uploading file to cloudinary:", file);
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return uploadResponse;
  } catch (error) {
    console.log("Cloudinary upload error:", error);
  }
};

exports.uploadVedio = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "video",
    });
    return result;
  } catch (error) {
    console.log("Cloudinary upload error:", error);
  }
};

exports.deleteMediaFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.log("Cloudinary delete error:", error);
    throw error;
  }
};

exports.deleteVedioFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
    return result;
  } catch (error) {
    console.log("Cloudinary video delete error:", error);
    throw error;
  }
};
