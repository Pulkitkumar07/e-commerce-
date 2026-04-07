import Product from '../../models/productModel.js';



const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword) return res.status(400).json({ message: "Keyword missing" });

    
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    
    
    const fuzzySearch = escapedKeyword.split("").join(".*");

   const searchResults = await Product.find({
      $or: [
        { title: { $regex: fuzzySearch, $options: "i" } },
        { description: { $regex: fuzzySearch, $options: "i" } },
        { brand: { $regex: fuzzySearch, $options: "i" } },     
        { category: { $regex: fuzzySearch, $options: "i" } }   
      ]
    })
    .limit(20)
    .lean();


    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



export default searchProducts;