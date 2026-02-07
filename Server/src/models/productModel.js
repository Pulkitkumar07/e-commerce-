import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      default: null,
    },
    stock: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
