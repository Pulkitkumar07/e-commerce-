import ProductReview from "../../models/Review.js";
import Product from "../../models/productModel.js";
import Orders from "../../models/Order.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../../utils/apiResponse.js";

const addProductReview = asyncHandler(async (req, res) => {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    if (!productId || !userId || !userName || !reviewMessage || reviewValue === undefined) {
        return sendError(res, "Please provide review message and rating", 400);
    }

    const order = await Orders.findOne({
        userId,
        "cartItems.productId": productId,
        orderStatus: "Confirmed",
    });

    if (!order) {
        return sendError(res, "You must purchase this item first", 403);
    }

    const existingReview = await ProductReview.findOne({ productId, userId });
    if (existingReview) {
        return sendError(res, "You have already reviewed this product", 400);
    }

    const newReview = new ProductReview({
        productId,
        userId,
        userName,
        reviewMessage,
        reviewValue,
    });

    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const averageRating = reviews.reduce((sum, item) => sum + item.reviewValue, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, { averageRating });

    return sendSuccess(res, newReview, "Review added successfully", 201);
});

const getProductReview = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        return sendError(res, "Product id is required", 400);
    }

    const reviews = await ProductReview.find({ productId });

    return sendSuccess(res, reviews, "Reviews fetched");
});

export default {
    addProductReview,
    getProductReview,
};
