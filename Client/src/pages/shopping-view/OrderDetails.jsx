import { useSelector } from 'react-redux';


const OrderDetails = ({ order }) => {
   const user = useSelector((state) => state.user.user);
  
 
   if (!order) return null;

  return (
   
    <div className="grid gap-4">
      <div className="border rounded-xl p-4 bg-gray-50 flex flex-col gap-4 shadow-sm">

        
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">Order ID</p>
            <p className="font-mono font-medium text-[12px]">{order?._id}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-500">Date</p>
            <p className="font-semibold">
              {new Date(order.orderDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-500">Status</p>
            <p className={`font-bold ${order.orderStatus === 'Confirmed' ? 'text-green-600' : 'text-blue-600'}`}>
                {order.orderStatus}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-500">Payment</p>
            <p className="font-semibold">{order.paymentMethod} ({order.paymentStatus})</p>
          </div>

          <div className="flex justify-between items-center border-t pt-2 mt-1">
            <p className="font-bold">Total Amount</p>
            <p className="font-bold text-lg text-primary">₹{order.totalAmount}</p>
          </div>
        </div>

        <hr className="opacity-50" />

  
        <div className="grid gap-2">
          <p className="font-bold text-xs uppercase tracking-wider text-gray-500">Items Purchased</p>
          <div className="space-y-2">
            {order.cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-gray-100"
              >
                <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-gray-400">Qty: {item.quantity || 1}</span>
                </div>
                <span className="font-bold">₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="opacity-50" />

   
        <div className="grid gap-2">
          <p className="font-bold text-xs uppercase tracking-wider text-gray-500">Shipping Details</p>
          <div className="text-sm bg-white p-3 rounded-lg border border-gray-100 space-y-1">
            <p className="font-bold text-gray-900">{user?.userName || user?.username}</p>
            <p className="text-gray-600">{order.addressInfo?.address}</p>
            <div className="flex gap-4 text-xs text-gray-500 pt-1">
                <span>Pin: {order.addressInfo?.pincode}</span>
                <span>Mob: {order.addressInfo?.phone}</span>
            </div>
            {order.addressInfo?.notes && (
                <p className="text-xs italic text-blue-500 bg-blue-50 p-1 rounded mt-1">
                    Note: {order.addressInfo.notes}
                </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;