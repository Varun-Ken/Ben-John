import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/product.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64" + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("Error Iamge Upload Controller");
    res
      .status(500)
      .json({ success: false, message: "Image upload failed", error });
  }
};

export const addNewProductController = async (req, res) => {
  try {
    const {
      title,
      description,
      brand,
      category,
      totalStock,
      price,
      salePrice,
      image,
    } = req.body;
    const newProduct = new Product({
      title,
      description,
      brand,
      category,
      totalStock,
      price,
      salePrice,
      image,
    });
    await newProduct.save();
    console.log("New Product Created");
    res
      .status(201)
      .json({ success: true, message: "New Product Created", newProduct });
  } catch (error) {
    console.log(`Error in Add New Product Controller: ${error}`);
    res.status(500).json({ success: false, message: "Add new product failed" });
  }
};

export const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res
      .status(200)
      .json({ success: true, message: "List of Products", listOfProducts });
  } catch (error) {
    console.log(`Error in Fetch All Products Controller: ${error}`);
    res
      .status(500)
      .json({ success: false, message: "Fetch all products failed" });
  }
};

export const editProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      brand,
      category,
      totalStock,
      price,
      salePrice,
    } = req.body;
    const selectProduct = await Product.findById(id);
    if (!selectProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    selectProduct.title = title || selectProduct.title;
    selectProduct.description = description || selectProduct.description;
    selectProduct.brand = brand || selectProduct.brand;
    selectProduct.category = category || selectProduct.category;
    selectProduct.totalStock = totalStock || selectProduct.totalStock;
    selectProduct.price = price || selectProduct.price;
    selectProduct.salePrice = salePrice || selectProduct.salePrice;

    await selectProduct.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Product updated successfully",
        selectProduct,
      });
  } catch (error) {
    console.log(`Error in Edit Product Controller: ${error}`);
    res.status(500).json({ success: false, message: "Edit product failed" });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedProduct = await Product.findByIdAndDelete(id);
    if (!selectedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(`Error in Delete Product Controller: ${error}`);
    res.status(500).json({ success: false, message: "Delete product failed" });
  }
};
