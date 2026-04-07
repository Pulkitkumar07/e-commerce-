import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* ✅ Success Icon */}
        <div className="text-green-500 text-6xl mb-4">✅</div>

        {/* ✅ Heading */}
        <h1 className="text-2xl font-bold mb-2">
          Payment Successful!
        </h1>

        {/* ✅ Message */}
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed 🎉
        </p>

       
        <div className="flex flex-col gap-3">
          
          <button
            onClick={() => navigate("/shop/home")}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
             Back to Home
          </button>

          <button
            onClick={() => navigate("/shop/checkout")}
            className="border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
             View Orders
          </button>

        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;