import express from "express";
import multer from "multer";
import {
  createProduct,
  fetchAllProducts,
  editProducts,
  deleteProducts,
} from "../controllers/admin/product-control.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/add", upload.single("image"), createProduct);
router.get("/get", fetchAllProducts);
router.put("/edit/:id", upload.single("image"), editProducts);
router.delete("/delete/:id", deleteProducts);

export default router;
