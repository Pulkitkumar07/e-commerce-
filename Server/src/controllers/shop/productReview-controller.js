import ProductReview from "../../models/Review.js";
import Product from '../../models/productModel.js'
import mongoose from "mongoose";
import Orders from "../../models/Order.js";

const addProductReview = async (req, res) => {
    try {
        const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

       
        if (!productId || !userId || !userName || !reviewMessage || reviewValue === undefined) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Please provide all fields (message and rating)."
            });
        }

       
        const Order = await Orders.findOne({ 
            userId: userId, 
            "cartItems.productId": productId, 
            orderStatus: "Confirmed" 
        });

        if (!Order) {
            return res.status(403).json({
                success: false,
                message: "You must purchase this item first."
            });
        }

        
        const checkExistingReview = await ProductReview.findOne({ productId, userId });
        if (checkExistingReview) {
            return res.status(400).json({
                success: false,
                message: "DUPLICATE: You have already reviewed this product."
            });
        }

        const newReview = new ProductReview({ productId, userId, userName, reviewMessage, reviewValue });
        await newReview.save();

        
        const reviews = await ProductReview.find({ productId });
        const averageRating = reviews.reduce((sum, item) => sum + item.reviewValue, 0) / reviews.length;
        
        await Product.findByIdAndUpdate(productId, { averageRating });

        res.status(201).json({
            success: true,
            message: "Review added successfully!",
            data: newReview
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getProductReview = async (req, res) => {
    try {
        const {productId}=req.params;
        if(!productId){
            return res.status(404).json({
                message:"Product id is not found "
            })
        }
        const review =await ProductReview.find({productId})
        
        res.status(200).json({
            message:"Found review successfully",
            data:review
        })
    } catch (err) {
        console.log("Server error", err)
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

export default {
    addProductReview,
    getProductReview
}