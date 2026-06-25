import Product from "../../models/productModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../../utils/apiResponse.js";

const searchProducts = asyncHandler(async (req, res) => {
  const { keyword } = req.params;

  if (!keyword) {
    return sendError(res, "Keyword missing", 400);
  }

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const fuzzySearch = escapedKeyword.split("").join(".*");

  const searchResults = await Product.find({
    $or: [
      { title: { $regex: fuzzySearch, $options: "i" } },
      { description: { $regex: fuzzySearch, $options: "i" } },
      { brand: { $regex: fuzzySearch, $options: "i" } },
      { category: { $regex: fuzzySearch, $options: "i" } },
    ],
  })
    .limit(20)
    .lean();

  return sendSuccess(res, searchResults, "Search results fetched");
});

export default searchProducts;
