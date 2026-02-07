import cloudinary from "cloudinary";
import multer from "multer";



const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = async (base64Image) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.v2.uploader.upload(base64Image, {
    folder: "products",
  });

  return result;
};

export { upload, uploadToCloudinary };
