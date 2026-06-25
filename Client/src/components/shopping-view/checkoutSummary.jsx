import { getCartItemPrice } from "@/lib/order.js";

const CheckoutSummary = ({ cartItems, subtotal, delivery, total, onPlaceOrder }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit sticky top-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="max-h-[250px] overflow-y-auto space-y-3 pr-1">
        {cartItems.length === 0 ? (
          <p className="text-gray-400 text-sm">Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-md" />

              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>

              <p className="text-sm font-semibold">
                ₹{getCartItemPrice(item) * item.quantity}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
        </div>
      </div>

      <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button
        onClick={onPlaceOrder}
        className="w-full mt-5 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutSummary;
