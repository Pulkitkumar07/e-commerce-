import express from "express";
import  orderController  from "../controllers/admin/order-controller.js";

const router= express.Router();

router.get("/AllUserOrders",orderController.getOrderOfallUsers);
router.get("/OrderDetails/:id",orderController.getOrderDetails);
router.put("/UpdateOrderStatus/:id",orderController.updateOrderStatus);

export default router;