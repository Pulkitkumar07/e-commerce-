import express from 'express';
import {addProduct, deleteProducts, editProducts, fetchAllProducts, handleImageUpload} from '../controllers/admin/product-control.js';
import { upload } from '../services/cloudinary.js';
const router = express.Router();

router.post(
  "/upload-image",
  upload.single("image"),
  handleImageUpload
);
router.post("/add",addProduct)
router.put("/edit/:id",editProducts)
router.delete("/delete/:id",deleteProducts)
router.get("/get",fetchAllProducts)


export default router;