import express from 'express';
import { getFilterProduct, getProductDetails } 
from "../controllers/shop/product-controller.js";


const router =express.Router();

router.get("/get",getFilterProduct)
router.get("/get/:id",getProductDetails)



export default router