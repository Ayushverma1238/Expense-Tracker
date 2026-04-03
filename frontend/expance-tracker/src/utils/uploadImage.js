import { API_PATH } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATH.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000, // 🔥 important
      }
    );

    return response.data;

  } catch (error) {
    console.error("Error uploading image:", error);

    return {
      status: "error",
      message: error?.response?.data?.message || error.message,
    };
  }
};


export default uploadImage;