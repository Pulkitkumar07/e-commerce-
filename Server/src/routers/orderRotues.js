import express from 'express';
import orderController from '../controllers/shop/order-controller.js'
import orderProtect  from '../middleware/orderProtect.js';

const router =express();

router.post('/create', orderController.createOrder);
router.post('/capture', orderController.capturePayment);
router.post('/execute-payment',orderProtect, orderController.executePayment);
router.get("/all/:userId",orderController.getAllOrders);
router.get("/details/:id",orderController.getOrderDetails);
export default router