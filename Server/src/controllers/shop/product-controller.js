import Product from "../../models/productModel.js";

export const getFilterProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.log("filter err:", error);
        res.status(500).json({
            message: "Some error occured"
        });
    }
};
