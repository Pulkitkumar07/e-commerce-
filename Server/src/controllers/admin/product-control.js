import { uploadToCloudinary } from "../../services/cloudinary.js";
import Product from '../../models/productModel.js'
import asyncHandler from "../../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../../utils/apiResponse.js";



export const createProduct = asyncHandler(async (req, res) => {
    const {
      title,
      description,
      category,
      brand,
      price,
      stock,
      salePrice,
    } = req.body;

   
    if (!title || !price || !stock) {
      return sendError(res, "Title, price and stock are required", 400);
    }

    if (!req.file) {
      return sendError(res, "Product image is required", 400);
    }

   
    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    const result = await uploadToCloudinary(dataURI);

    
    const product = await Product.create({
      title,
      description,
      category,
      brand,
      price,
      stock,
      salePrice,
      imageUrl: result.secure_url,
    });

    return sendSuccess(res, product, "Product created successfully", 201);
});




export const fetchAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });

    return sendSuccess(res, products, "Products fetched");
});


export const editProducts = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      brand,
      price,
      stock,
      salePrice,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return sendError(res, "Product not found", 404);
    }

    if (title) product.title = title;
    if (description) product.description = description;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (salePrice) product.salePrice = salePrice;

    if (req.file) {
      const base64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${base64}`;
      const result = await uploadToCloudinary(dataURI);
      product.imageUrl = result.secure_url;
    }

    const updatedProduct = await product.save(); 

    return sendSuccess(res, updatedProduct, "Product updated successfully");
});


export const deleteProducts = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return sendError(res, "Product not found", 404);
    }

    return sendSuccess(res, deletedProduct, "Product deleted successfully");
});

export default { createProduct, fetchAllProducts, editProducts, deleteProducts };
