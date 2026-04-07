import { DialogContent } from '@/components/ui/dialog';
import { useSelector } from 'react-redux';

const OrderDetails = ({ orderDetails }) => {
   const user=useSelector((state)=>state.user.user);
  if (!orderDetails) return null;
  

  return (
    <DialogContent className="w-[95%] sm:max-w-[600px] rounded-xl">

      <div className="grid gap-5">

        <div className="border rounded-xl mt-5 p-4 sm:p-6 bg-gray-50 flex flex-col gap-5 shadow-sm">

          {/* Order Info */}
          <div className="grid gap-3 text-sm sm:text-base">

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <p className="text-gray-500">Order ID</p>
              <p className="font-semibold break-all">{orderDetails._id}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <p className="text-gray-500">Order Date</p>
              <p className="font-semibold">
                {new Date(orderDetails.orderDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
             <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <p className="text-gray-500">Payment Method</p>
              <p className="font-semibold">{orderDetails.paymentMethod}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <p className="text-gray-500">Payment Status</p>
              <p className="font-semibold">{orderDetails.paymentStatus}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <p className="text-gray-500">Total Amount</p>
              <p className="font-semibold text-green-600">
                ₹{orderDetails.totalAmount}
              </p>
            </div>

          </div>

          <hr />

          {/* Products */}
          <div className="grid gap-3">
            <p className="font-medium text-gray-700">Products</p>

            {orderDetails.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm bg-white p-2 rounded-md"
              >
                <span className="truncate">{item.title}</span>
                <span className="font-medium">₹{item.price}</span>
              </div>
            ))}
          </div>

          <hr />

          {/* Shipping Info */}
          <div className="grid gap-2">
            <p className="font-medium text-gray-700">Shipping Info</p>
            
            <div className="text-sm text-gray-600 space-y-1">
               <p className='text-sm text-gray-800 '> {user.username}</p>
              <p>{orderDetails.addressInfo.address}</p>
              <p>Pincode: {orderDetails.addressInfo.pincode}</p>
              <p>Phone: {orderDetails.addressInfo.phone}</p>
              <p className="italic">{orderDetails.addressInfo.notes}</p>
            </div>
          </div>

        </div>

      </div>

    </DialogContent>
  );
};

export default OrderDetails;