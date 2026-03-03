import Product from "../../models/productModel.js";

export const getFilterProduct = async (req, res) => {
  try {

    const { category, brand, price, sort } = req.query;
     
     
    let query = {};

  
    if (category && category.length > 0) {
      query.category = { $in: [].concat(category) };
    }

    
    if (brand && brand.length > 0) {
      query.brand = { $in: [].concat(brand) };
    }

    if (price) {
      if (price === "0-500") {
        query.price = { $lte: 500 };
      }

      if (price === "500-1000") {
        query.price = { $gte: 500, $lte: 1000 };
      }

      if (price === "1000-2000") {
        query.price = { $gte: 1000,$lte:2000 };
      }
      if(price==="2000+"){
        query.price={$gte:2000}
      }
    }

   
    let sortOption = {};

    switch (sort) {
      case "price-low":
        sortOption.price = 1; 
        break;

      case "price-high":
        sortOption.price = -1; // descending
        break;

      case "title-asc":
        sortOption.title = 1;
        break;

      case "title-desc":
        sortOption.title = -1;
        break;

      default:
        sortOption = {};
    }
   console.log("gueru",query);
   console.log("short",sortOption);
   
   
    const products = await Product.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    console.log("filter err:", error);
    res.status(500).json({
      message: "Some error occurred",
    });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Found Successfully",
      data: product
    });

  } catch (error) {
    console.log("Error finding product:", error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
