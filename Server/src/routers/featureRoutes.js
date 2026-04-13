import express from "express";
import multer from "multer";
import FeatureController from "../controllers/admin/Feature-controller.js";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/add",
    upload.single("image"),
    FeatureController.addFeatureImage
);

router.get("/get", FeatureController.getFeatureImage);

export default router;