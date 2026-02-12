import { uploadToCloudinary } from "../../services/cloudinary.js";
import Product from '../../models/productModel.js'



export const createProduct = async (req, res) => {
  try {
    console.log("data backend:", req.file);

    const {
      title,
      description,
      category,
      brand,
      price,
      stock,
      salePrice,
    } = req.body;

    // basic validation
    if (!title || !price || !stock) {
      return res.status(400).json({
        message: "Title, price and stock are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    // buffer -> base64 -> cloudinary
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

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      message: "Failed to create product",
    });
  }
};




export const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Fetch products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};


export const editProducts = async (req, res) => {
  try {
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
      return res.status(404).json({ message: "Product not found" });
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
      product.image = result.secure_url;
    }

    const updatedProduct = await product.save(); // ✅ FIXED

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error("Edit product:", error);
    res.status(500).json({ message: "Error editing product" });
  }
};


export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });

  } catch (error) {
    console.error("Delete product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

export default { createProduct, fetchAllProducts, editProducts, deleteProducts };
