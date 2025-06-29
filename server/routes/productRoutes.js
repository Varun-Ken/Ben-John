import express from "express";
import {
  handleImageUpload,
  addNewProductController,
  fetchAllProducts,
  deleteProductController,
  editProductController,
} from "../controllers/admin/productsController.js";
import { Router } from "express";
import { upload } from "../helpers/cloudinary.js";

const router = Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addNewProductController);
router.get("/get", fetchAllProducts);
router.put("/edit/:id", editProductController);
router.delete("/delete/:id", deleteProductController);

export default router;
