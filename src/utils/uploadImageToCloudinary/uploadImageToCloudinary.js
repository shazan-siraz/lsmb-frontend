import axios from "axios";

const uploadImageToCloudinary = async (imageUrl) => {
  const CLOUDINARY_CLOUD_NAME = "dtfhmall2";
  const CLOUDINARY_UPLOAD_PRESET_KEY = "ismb-uploadPreset";

  // Upload image to Cloudinary
  const formData = new FormData();
  formData.append("file", imageUrl);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET_KEY); // replace with your Cloudinary upload preset

  const imageRes = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  ); // replace with your Cloudinary cloud name

  const secure_url = imageRes?.data?.secure_url;

  return secure_url;
};

export default uploadImageToCloudinary;
