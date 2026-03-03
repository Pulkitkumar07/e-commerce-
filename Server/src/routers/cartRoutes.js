import express from 'express';
import {
  addToCart,
  fetchCartItem,
  updateCartItemQty,
  deleteCartItem
} from "../controllers/shop/cartController.js";

const router = express.Router();

router.post('/add', addToCart)
router.get('/get/:userId', fetchCartItem)
router.put('/update/:userId/:productId', updateCartItemQty)
router.delete('/delete/:userId/:productId', deleteCartItem)

export default router;