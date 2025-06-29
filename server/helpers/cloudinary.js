import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "ds4kfmaty",
  api_key: "537727685172272",
  api_secret: "KiYxLr5-QBLFQra0G3ujYFdnGks",
});

const storage = new multer.memoryStorage();

const imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
};

const upload = multer({ storage });

export { imageUploadUtil, upload };
