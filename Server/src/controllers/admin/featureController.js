import FeatureModel from "../../models/feature.js";
import { uploadToCloudinary } from "../../services/cloudinary.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../../utils/apiResponse.js";


const addFeatureImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        return sendError(res, "Image file is required", 400);
    }

    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;
    const result = await uploadToCloudinary(dataURI);

    const featureImage = new FeatureModel({
        imageUrl: result.secure_url,
    });

    await featureImage.save();

    return sendSuccess(res, featureImage, "Feature image added", 201);
});

const getFeatureImage = asyncHandler(async (req, res) => {
    const images = await FeatureModel.find({});
    return sendSuccess(res, images, "Feature images fetched");
});


export default {
    addFeatureImage, getFeatureImage
}
