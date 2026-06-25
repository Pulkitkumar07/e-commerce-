import paypal from "../../services/paypal.js";
import Orders from "../../models/Order.js";
import User from "../../models/User.js";
import { sendEmail } from "../../services/sendEmail.js";
import cart from "../../models/cart.js";
import Product from "../../models/productModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../../utils/apiResponse.js";

const paypalReturnUrl = process.env.PAYPAL_RETURN_URL;
const paypalCancelUrl = process.env.PAYPAL_CANCEL_URL;

if (!paypalReturnUrl || !paypalCancelUrl) {
  throw new Error("PAYPAL_RETURN_URL and PAYPAL_CANCEL_URL are required in Server/.env");
}

const isValidCartItems = (cartItems) => {
  return Array.isArray(cartItems) && cartItems.length > 0;
};

const calculateTotalAmount = (cartItems) => {
  const total = cartItems.reduce((acc, item) => {
    return acc + Number(item.price) * Number(item.quantity);
  }, 0);

  return Number(total.toFixed(2));
};

const formatOrderItems = (cartItems) => {
  return cartItems.map((item) => ({
    productId: item.productId,
    title: item.title,
    price: Number(item.price),
    quantity: Number(item.quantity),
  }));
};

const createPaypalPayment = (paymentPayload) => {
  return new Promise((resolve, reject) => {
    paypal.payment.create(paymentPayload, (error, payment) => {
      if (error) {
        return reject(error);
      }

      return resolve(payment);
    });
  });
};

const executePaypalPayment = (paymentId, payerId) => {
  return new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, { payer_id: payerId }, (error, payment) => {
      if (error) {
        return reject(error);
      }

      return resolve(payment);
    });
  });
};

const getApprovalUrl = (payment) => {
  return payment.links?.find((link) => link.rel === "approval_url")?.href;
};

const buildPaypalPaymentPayload = (cartItems, orderId, totalAmount) => {
  return {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: paypalReturnUrl,
      cancel_url: paypalCancelUrl,
    },
    transactions: [
      {
        custom: orderId,
        item_list: {
          items: cartItems.map((item) => ({
            name: item.title,
            sku: item.productId,
            price: Number(item.price).toFixed(2),
            currency: "USD",
            quantity: Number(item.quantity),
          })),
        },
        amount: {
          currency: "USD",
          total: totalAmount.toFixed(2),
        },
      },
    ],
  };
};

const validatePayment = (payment, order, userId) => {
  const transaction = payment.transactions?.[0];

  if (!transaction) {
    return { message: "Payment transaction not found", statusCode: 400 };
  }

  if (order.userId.toString() !== userId) {
    return { message: "Unauthorized access", statusCode: 403 };
  }

  if (order.paymentStatus === "Completed") {
    return { message: "Payment already processed", statusCode: 400 };
  }

  const paidAmount = Number(transaction.amount.total);
  const orderAmount = Number(order.totalAmount.toFixed(2));

  if (paidAmount !== orderAmount) {
    return { message: "Payment amount does not match order total", statusCode: 400 };
  }

  if (transaction.amount.currency !== "USD") {
    return { message: "Payment currency must be USD", statusCode: 400 };
  }

  if (payment.state !== "approved") {
    return { message: "Payment not approved", statusCode: 400 };
  }

  return null;
};

const validateProductStock = async (cartItems) => {
  for (const item of cartItems) {
    const product = await Product.findById(item.productId);

    if (!product) {
      return `Product with id ${item.productId} not found`;
    }

    if (product.stock < item.quantity) {
      return `${product.title} does not have enough stock`;
    }
  }

  return null;
};

const reduceProductStock = async (cartItems) => {
  for (const item of cartItems) {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: item.productId,
        stock: { $gte: item.quantity },
      },
      {
        $inc: { stock: -item.quantity },
      },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return `Product with id ${item.productId} does not have enough stock`;
    }
  }

  return null;
};

const clearUserCart = async (userId) => {
  await cart.deleteMany({ userId });
};

const sendOrderConfirmationEmail = async (user, order) => {
  if (!user?.email) {
    return;
  }

  const html = `
    <div style="font-family: Arial; padding:20px;">
      <h2>Order Confirmed</h2>
      <p>Hello ${user.username || "Customer"},</p>
      <p>Your payment was successful.</p>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Amount:</strong> $${order.totalAmount}</p>
      <p>Status: Confirmed</p>
    </div>
  `;

  await sendEmail(user.email, "Order Confirmed", html);
};

const createOrder = asyncHandler(async (req, res) => {
  const { userId, cartItems, addressInfo } = req.body;

  if (!userId || !isValidCartItems(cartItems)) {
    return sendError(res, "Invalid order data", 400);
  }

  const totalAmount = calculateTotalAmount(cartItems);

  const newOrder = new Orders({
    userId,
    cartItems: formatOrderItems(cartItems),
    addressInfo,
    totalAmount,
    orderStatus: "Pending",
    paymentMethod: "PayPal",
    paymentStatus: "Pending",
    orderDate: new Date(),
    orderUpdate: new Date(),
    paymentId: "",
    payerId: "",
  });

  await newOrder.save();

  return sendSuccess(res, { orderId: newOrder._id }, "Order created", 201);
});

const capturePayment = asyncHandler(async (req, res) => {
  const { cartItems, orderId } = req.body;

  if (!isValidCartItems(cartItems) || !orderId) {
    return sendError(res, "Invalid payment data", 400);
  }

  const stockError = await validateProductStock(cartItems);
  if (stockError) {
    return sendError(res, stockError, 400);
  }

  const totalAmount = calculateTotalAmount(cartItems);
  const paymentPayload = buildPaypalPaymentPayload(cartItems, orderId, totalAmount);
  const payment = await createPaypalPayment(paymentPayload);
  const approvalUrl = getApprovalUrl(payment);

  if (!approvalUrl) {
    return sendError(res, "Approval URL not found", 400);
  }

  return sendSuccess(res, { approvalUrl }, "Payment created");
});

const executePayment = asyncHandler(async (req, res) => {
  const { paymentId, payerId } = req.body;

  if (!paymentId || !payerId) {
    return sendError(res, "Missing payment data", 400);
  }

  const payment = await executePaypalPayment(paymentId, payerId);
  const orderId = payment.transactions?.[0]?.custom;
  const order = await Orders.findById(orderId);

  if (!order) {
    return sendError(res, "Order not found", 404);
  }

  const paymentError = validatePayment(payment, order, req.user.id);
  if (paymentError) {
    return sendError(res, paymentError.message, paymentError.statusCode);
  }

  const stockError = await reduceProductStock(order.cartItems);
  if (stockError) {
    return sendError(res, stockError, 400);
  }

  const currency = payment.transactions[0].amount.currency;

  order.paymentStatus = "Completed";
  order.orderStatus = "Confirmed";
  order.paymentId = paymentId;
  order.payerId = payerId;
  order.orderUpdate = new Date();

  await order.save();

  const user = await User.findById(req.user.id);
  const warnings = [];

  try {
    await clearUserCart(order.userId);
  } catch (error) {
    warnings.push("Payment completed, but cart cleanup failed");
  }

  try {
    await sendOrderConfirmationEmail(user, order);
  } catch (error) {
    warnings.push("Payment completed, but confirmation email failed");
  }

  if (warnings.length) {
    order.orderStatus = "Confirmed - Action Needed";
    order.orderUpdate = new Date();
    await order.save();
  }

  const responseMessage = warnings.length
    ? "Payment successful, but some follow-up actions need attention"
    : "Payment successful";

  return sendSuccess(res, {
    orderId: order._id,
    paymentId: order.paymentId,
    payerId: order.payerId,
    totalAmount: order.totalAmount,
    currency,
    orderStatus: order.orderStatus,
    warnings,
  }, responseMessage);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return sendError(res, "Missing user id", 400);
  }

  const orders = await Orders.find({ userId }).sort({ orderDate: -1 });

  if (!orders.length) {
    return sendError(res, "No orders found for this user", 404);
  }

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

export default {
  createOrder,
  capturePayment,
  executePayment,
  getAllOrders,
  getOrderDetails,
};
