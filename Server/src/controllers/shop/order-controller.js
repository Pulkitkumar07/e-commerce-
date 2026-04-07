import paypal from "../../services/paypal.js";
import Orders from "../../models/Order.js";
import User from "../../models/User.js";
import { sendEmail } from '../../services/sendEmail.js';
import cart from '../../models/cart.js';
import Product from '../../models/productModel.js';



const createOrder = async (req, res) => {

  try {
    const { userId, cartItems, addressInfo } = req.body;

    if (!userId || !cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    const totalAmount = cartItems.reduce(
      (acc, item) =>
        acc + Number(item.price) * Number(item.quantity),
      0
    );
  

    const newOrder = new Orders({
    
      userId,
      cartItems: cartItems.map((item) => ({
        productId: item.productId,
        title: item.title,
        price: Number(item.price),
        
        quantity: Number(item.quantity),
      })),
      addressInfo,
      totalAmount: Number(totalAmount),

      orderStatus: "Pending",
      paymentMethod: "PayPal",
      paymentStatus: "Pending",

      orderDate: new Date(),
      orderUpdate: new Date(),

      paymentId: "",
      payerId: "",
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      orderId: newOrder._id, // 🔥 important
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




const capturePayment = async (req, res) => {
  try {
    const { cartItems, orderId } = req.body;


    console.log("Capturing payment with data:", { cartItems, orderId });
    if (!cartItems || cartItems.length === 0 || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment data",
      });
    }

    const subtotal = cartItems.reduce((acc, item) => {
      return acc + Number(item.price) * Number(item.quantity);
    }, 0);

    const totalAmount = Number(subtotal.toFixed(2));

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
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

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.log("PAYPAL ERROR:", error.response || error);

        return res.status(500).json({
          success: false,
          message: "PayPal payment creation failed",
        });
      }

      const approvalUrl = payment.links?.find(
        (link) => link.rel === "approval_url"
      )?.href;

      if (!approvalUrl) {
        return res.status(400).json({
          success: false,
          message: "Approval URL not found",
        });
      }

      return res.json({
        success: true,
        approvalUrl,
      });
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};





const executePayment = async (req, res) => {
  try {
    const { paymentId, payerId } = req.body;

    if (!paymentId || !payerId) {
      return res.status(400).json({
        success: false,
        message: "Missing payment data",
      });
    }

    const execute_payment_json = {
      payer_id: payerId,
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async (error, payment) => {
        if (error) {
          console.log("PAYPAL ERROR:", error.response || error);
          return res.status(500).json({
            success: false,
            message: "Payment execution failed",
          });
        }

        try {
          const orderId = payment.transactions[0].custom;

          const order = await Orders.findById(orderId);

          if (!order) {
            return res.status(404).json({
              success: false,
              message: "Order not found",
            });
          }

          // 🔥 FIXED HERE
          if (order.userId.toString() !== req.user.userId) {
            return res.status(403).json({
              success: false,
              message: "Unauthorized access",
            });
          }

          if (order.paymentStatus === "Completed") {
            return res.status(400).json({
              success: false,
              message: "Payment already processed",
            });
          }

          const paidAmount = payment.transactions[0].amount.total;
          const orderAmount = order.totalAmount.toFixed(2);

          if (paidAmount !== orderAmount) {
            return res.status(400).json({
              success: false,
              message: "Amount mismatch",
            });
          }

          const currency = payment.transactions[0].amount.currency;

          if (currency !== "USD") {
            return res.status(400).json({
              success: false,
              message: "Invalid currency",
            });
          }

          if (payment.state !== "approved") {
            return res.status(400).json({
              success: false,
              message: "Payment not approved",
            });
          }

         
          order.paymentStatus = "Completed";
          order.orderStatus = "Confirmed";
          order.paymentId = paymentId;
          order.payerId = payerId;
          order.orderUpdate = new Date();

          for(let item of order.cartItems){
            const product=await Product.findById(item.productId);
            if(!product){
               return res.status(404).json({
                success:false,
                message:`Product with id ${item.productId} not found`
               })
            }
            if(product){
              product.stock=product.stock-item.quantity;
              await product.save();
            }
            
          }

          await order.save();

          await cart.deleteMany({ userId: order.userId });
          const user = await User.findById(req.user.userId);

          if (user?.email) {
            const html = `
              <div style="font-family: Arial; padding:20px;">
                <h2>🎉 Order Confirmed</h2>
                <p>Hello ${user.name || "Customer"},</p>
                <p>Your payment was successful.</p>
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Amount:</strong> $${order.totalAmount}</p>
                <p>Status: Confirmed ✅</p>
              </div>
            `;

            await sendEmail(user.email, "🎉 Order Confirmed", html);
          }
          

          return res.json({
            success: true,
            message: "Payment successful",
            orderDetails: {
              orderId: order._id,
              paymentId: order.paymentId,
              payerId: order.payerId,
              totalAmount: order.totalAmount,
              currency,
              orderStatus: order.orderStatus,
            },
          });

        } catch (dbError) {
          console.log("DB ERROR:", dbError);
          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }
      }
    );

  } catch (error) {
    console.log("SERVER ERROR:", error);
    return res.status(500).json({
      success: false,
    });
  }
};


const getAllOrders =async (req,res)=>{
  
  try{
   const {userId}= req.params;
  
    if(!userId){
    return res.status(400).json({
      success:false,
      message:"Missing user id"
    })
   }
   const orders= await Orders.find({userId}).sort({orderDate:-1}); 
   
   if(!orders.length){
    return res.status(404).json({
      success:false,
      message:"No orders found for this user"
    })
   }

   return res.json({
    success:true,
    orders
   })
  
  }catch(error){
    res.status(500).json({
      success:false,
      message:"Server Error"
    })
  }
}

const getOrderDetails=async(req,res)=>{
  
  try{
   const {id}= req.params;
    if(!id){
    return res.status(400).json({
      success:false,
      message:"Missing order id"
    })
   }
   const order= await Orders.findById(id);
   if(!order){
    return res.status(404).json({
      success:false,
      message:"Order not found"
    })
   }
   return res.json({
    success:true,
    data:order
   })

 
  }catch(error){
    res.status(500).json({
      success:false,
      message:"Server Error"
    })
  }
}


export default {
  createOrder,
  capturePayment,
  executePayment,
  getAllOrders,
  getOrderDetails
};
