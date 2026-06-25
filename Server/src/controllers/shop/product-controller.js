import Product from "../../models/productModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../../utils/apiResponse.js";

export const getFilterProduct = asyncHandler(async (req, res) => {
    const { category, brand, price, sort } = req.query;
     
     
    let query = {};

  
    if (category && category.length > 0) {
      query.category = { $in: [].concat(category) };
    }

    
    if (brand && brand.length > 0) {
      query.brand = { $in: [].concat(brand) };
    }

    if (price) {
      if (price === "0-500") {
        query.price = { $lte: 500 };
      }

      if (price === "500-1000") {
        query.price = { $gte: 500, $lte: 1000 };
      }

      if (price === "1000-2000") {
        query.price = { $gte: 1000,$lte:2000 };
      }
      if(price==="2000+"){
        query.price={$gte:2000}
      }
    }

   
    let sortOption = {};

    switch (sort) {
      case "price-low":
        sortOption.price = 1; 
        break;

      case "price-high":
        sortOption.price = -1; // descending
        break;

      case "title-asc":
        sortOption.title = 1;
        break;

      case "title-desc":
        sortOption.title = -1;
        break;

      default:
        sortOption = {};
    }

    const products = await Product.find(query).sort(sortOption);

    return sendSuccess(res, {
      count: products.length,
      products,
    }, "Products fetched");
});

export const getProductDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return sendError(res, "Product id is required", 400);
    }

    const product = await Product.findById(id);

    if (!product) {
      return sendError(res, "Product not found", 404);
    }

    return sendSuccess(res, product, "Product found successfully");
});
