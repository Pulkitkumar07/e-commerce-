import express from 'express';
import productReviewController from '../controllers/shop/productReview-controller.js';
const router=express.Router();

router.post("/add",productReviewController.addProductReview)
router.get("/get/:productId",productReviewController.getProductReview)


export default router;