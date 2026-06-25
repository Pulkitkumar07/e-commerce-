import Orders from "../../models/Order.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../../utils/apiResponse.js";

const getOrderOfallUsers = asyncHandler(async (req, res) => {
  const orders = await Orders.find({}).sort({ orderDate: -1 });
  return sendSuccess(res, orders, "Orders fetched");
});

const getOrderDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendError(res, "Missing order id", 400);
  }

  const order = await Orders.findById(id);
  if (!order) {
    return sendError(res, "Order not found", 404);
  }

  return sendSuccess(res, order, "Order details fetched");
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return sendError(res, "Missing order id or status", 400);
  }

  const order = await Orders.findByIdAndUpdate(
    id,
    { orderStatus: status },
    { new: true }
  );

  if (!order) {
    return sendError(res, "Order not found", 404);
  }

  return sendSuccess(res, order, "Order status updated");
});

export default { getOrderOfallUsers, getOrderDetails, updateOrderStatus };
