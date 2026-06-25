import mongoose from "mongoose";
import Cart from "../../models/cart.js";
import Product from "../../models/productModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../../utils/apiResponse.js";

const formatCartItems = (items) => {
  return items.map((item) => ({
    productId: item.productId?._id,
    title: item.productId?.title || "Product Not Found",
    image: item.productId?.imageUrl || null,
    price: item.productId?.price || 0,
    salePrice: item.productId?.salePrice || 0,
    quantity: item.quantity,
  }));
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const populateCartProducts = async (cart) => {
  await cart.populate({
    path: "items.productId",
    select: "imageUrl title price salePrice",
  });

  cart.items = cart.items.filter((item) => item.productId !== null);
  await cart.save();

  return formatCartItems(cart.items);
};

export const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity || quantity <= 0) {
    return sendError(res, "Invalid cart details", 400);
  }

  if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
    return sendError(res, "Invalid user or product id", 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    return sendError(res, "Product not found", 404);
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

  return sendSuccess(res, { cart }, "Product added to cart");
});

export const fetchCartItem = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return sendError(res, "User ID is required", 400);
  }

  if (!isValidObjectId(userId)) {
    return sendError(res, "Invalid user id", 400);
  }

  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "imageUrl title price salePrice",
  });

  if (!cart) {
    return sendSuccess(res, { cartItems: [] }, "Cart items fetched successfully");
  }

  const validCartItems = cart.items.filter((item) => item.productId !== null);

  if (validCartItems.length < cart.items.length) {
    cart.items = validCartItems;
    await cart.save();
  }

  return sendSuccess(
    res,
    { cartItems: formatCartItems(validCartItems) },
    "Cart items fetched successfully"
  );
});

export const updateCartItemQty = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  if (!userId || !productId || !quantity || quantity <= 0) {
    return sendError(res, "Invalid cart details", 400);
  }

  if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
    return sendError(res, "Invalid user or product id", 400);
  }

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return sendError(res, "Cart not found", 404);
  }

  const existingProductIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (existingProductIndex === -1) {
    return sendError(res, "Product not found in cart", 404);
  }

  cart.items[existingProductIndex].quantity = quantity;
  await cart.save();

  const cartItems = await populateCartProducts(cart);

  return sendSuccess(res, { cartItems }, "Cart item quantity updated successfully");
});

export const deleteCartItem = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;

  if (!userId || !productId) {
    return sendError(res, "User ID and Product ID are required", 400);
  }

  if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
    return sendError(res, "Invalid user or product id", 400);
  }

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return sendError(res, "Cart not found", 404);
  }

  cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
  await cart.save();

  const cartItems = await populateCartProducts(cart);

  return sendSuccess(res, { cartItems }, "Cart item deleted successfully");
});
