import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../../api/api.jsx";
import endpoints from "../../api/endpoints.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "@/store/actions/cartAction.js";

const PaypalReturn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  
  
  const executedRef = useRef(false);

  const paymentId = searchParams.get("paymentId");
  const payerId = searchParams.get("PayerID");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    
    if (!paymentId || !payerId || executedRef.current) return;

    const executePayment = async () => {
      executedRef.current = true; 
      try {
        const res = await axios.post(endpoints.shop.orders.executePayment, {
          paymentId,
          payerId,
        });

        if (res.data.success) {
          setStatus("success");

         
          if (user?._id) {
            dispatch(fetchCartItems(user._id));
          } 

          setTimeout(() => {
            navigate("/shop/payment-success");
          }, 2000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Payment Error:", err);
        setStatus("error");
      }
    };

    executePayment();
    
    // Explicitly adding stable dependencies and IDs
  }, [paymentId, payerId, dispatch, navigate, user?._id]); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md text-center border">
        {status === "loading" && (
          <div className="animate-pulse">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Processing Payment...</h2>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl mb-3 animate-bounce">✔</div>
            <h2 className="text-2xl font-bold text-gray-800">Payment Successful</h2>
            <p className="text-gray-500 mt-2">Redirecting you to your order summary...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-3">✖</div>
            <h2 className="text-2xl font-bold text-gray-800">Payment Failed</h2>
            <p className="text-gray-600 mb-4">There was an issue processing your transaction.</p>
            <button
              onClick={() => navigate("/shop/checkout")}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Back to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaypalReturn;
