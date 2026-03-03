import Cart from "../../models/cart.js";
import Product from "../../models/productModel.js";


export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart details",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const existingProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex > -1) {
      cart.items[existingProductIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




export const fetchCartItem = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "imageUrl title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const validCartItems = cart.items.filter(
      (item) => item.productId !== null
    );

    if (validCartItems.length < cart.items.length) {
      cart.items = validCartItems;
      await cart.save();
    }
    
    const formattedCartItems = validCartItems.map((item) => ({
      
      productId: item.productId._id,
      title: item.productId.title,
      image: item.productId.imageUrl,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "Cart items fetched successfully",
      cartItems: formattedCartItems,
    });

  } catch (error) {
    console.error("Error in fetchCartItem:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId} = req.params;
    const { quantity } = req.body;

    if (!userId || !productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Invalid cart details",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const existingProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex === -1) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    cart.items[existingProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "imageUrl title price salePrice",
    });

    const formattedCartItems = cart.items.map((item) => ({
      productId: item.productId?._id,
      title: item.productId?.title || "Product Not Found",
      image: item.productId?.imageUrl || null,
      price: item.productId?.price || 0,
      salePrice: item.productId?.salePrice || 0,
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "Cart item quantity updated successfully",
      cartItems: formattedCartItems,
    });

  } catch (error) {
    console.error("Error in updateCartItemQty:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "User ID and Product ID are required",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "imageUrl title price salePrice",
    });

    const formattedCartItems = cart.items.map((item) => ({
      productId: item.productId?._id,
      title: item.productId?.title || "Product Not Found",
      image: item.productId?.imageUrl || null,
      price: item.productId?.price || 0,
      salePrice: item.productId?.salePrice || 0,
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "Cart item deleted successfully",
      cartItems: formattedCartItems,
    });

  } catch (error) {
    console.error("Error in deleteCartItem:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};