import { uploadToCloudinary } from "../../services/cloudinary.js";
import Product from '../../models/productModel.js'
export const handleImageUpload = async (req, res) => {
  console.log("data backend:", req.file);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    const result = await uploadToCloudinary(dataURI);
    console.log("sucess full done");

    res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

export const addProduct = async (req, res) => {
  try {
  const { title, description, category, brand, price, stock, salePrice } = req.body;
  const image = req.body.image || null;

    const newProduct = new Product({
      title,
      description,
      category,
      brand,
      price,
      stock,
      salePrice,
      image,
    });
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error in adding product" });
  }
};

export const fetchAllProducts = async (req, res) => {
  try {
     const listofProduct =await Product.find({});
  } catch (error) {
    console.log("all product:", error);
    res.status(500).json({
      message: "Error Fetch all Product "
    })

  }
}

export const editProducts = async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, description, category, brand, price, stock, salePrice } = req.body;

    
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

    
    const updatedProduct = await Product.save();

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
    const { id } = req.params; // URL se product id lena
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.log("Delete product:", error);
    res.status(500).json({
      message: "Error deleting product"
    });
  }
};
export default { handleImageUpload, addProduct, fetchAllProducts, editProducts, deleteProducts };
