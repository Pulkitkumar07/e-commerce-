import FeatureModel from "../../models/feature.js";
import { uploadToCloudinary } from "../../services/cloudinary.js";


const addFeatureImage = async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image file is required",
            });
        }
        const base64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${base64}`;
        const result = await uploadToCloudinary(dataURI);

        console.log("url",result.secure_url)
        const featureImage = new FeatureModel({
            imageUrl: result.secure_url,
        });

        await featureImage.save();

        res.status(201).json({
            success: true,
            data: featureImage,
        });

    } catch (error) {
        console.log("SERVER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

const getFeatureImage = async (req, res) => {
    try {
        const images = await FeatureModel.find({})
        console.log("images",images)
        res.status(200).json({
            success: true,
            data: images
        })


    } catch (error) {
        console.log("server error", error);
        res.status(500).json({
            message: "some error occured",
        })
    }
}


export default {
    addFeatureImage, getFeatureImage
}