import { DialogContent } from '@/components/ui/dialog';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import {
  updateOrderStatus,
  GetOrderDetails,
  GetAllOrders
} from '@/store/actions/adminOrderAction';
import { toast } from 'react-toastify';

const OrderDetails = ({ orderDetails }) => {

  const [status, setStatus] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderDetails?.orderStatus) {
      setStatus(orderDetails.orderStatus);
    }
  }, [orderDetails]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = async (orderId) => {
    try {
      console.log('Updating order status:', status);


      await dispatch(updateOrderStatus(orderId, status));


      dispatch(GetOrderDetails(orderId));
      await dispatch(GetAllOrders());
      toast.success('Order status updated successfully!');

    } catch (error) {
      console.log("Update failed:", error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px]">

      <div className="grid gap-6">

        {/* ORDER CARD */}
        <div className="mt-6 border rounded-xl p-5 bg-gray-50 hover:bg-gray-100 transition-all flex flex-col gap-5 shadow-sm">

          {/* ORDER INFO */}
          <div className="grid gap-3">

            <div className="flex justify-between">
              <p className="text-xs uppercase text-gray-600 font-semibold">Order ID</p>
              <p className="font-semibold">{orderDetails?._id}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-xs uppercase text-gray-600 font-semibold">Order Date</p>
              <p className="font-semibold">
                {orderDetails?.orderDate
                  ? new Date(orderDetails.orderDate).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xs uppercase text-gray-600 font-semibold">
                Current Status
              </p>

              <span
                className={
                  orderDetails?.orderStatus === "Completed"
                    ? "bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold"
                    : orderDetails?.orderStatus === "Cancelled"
                      ? "bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold"
                      : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold"
                }
              >
                {orderDetails?.orderStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <p className="text-xs uppercase text-gray-600 font-semibold">Order Price</p>
              <p className="font-semibold">
                ₹{orderDetails?.totalAmount?.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-xs uppercase text-gray-600 font-semibold">Payment Method</p>
              <p className="font-semibold">
                {orderDetails?.paymentMethod || 'N/A'}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-xs uppercase text-gray-600 font-semibold">Payment Status</p>
              <p className="font-semibold">
                {orderDetails?.paymentStatus || 'N/A'}
              </p>
            </div>

            {/* STATUS SELECT */}
            <div className="flex justify-between items-center">
              <p className="text-xs uppercase text-gray-600 font-semibold">
                Update Status
              </p>

              <select
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

          </div>

          <hr />

          {/* ORDER ITEMS */}
          <div>
            <div className="font-medium text-gray-700 mb-2">
              Order Details
            </div>

            <ul className="text-sm space-y-2">
              {orderDetails?.cartItems?.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b pb-1"
                >
                  <span>
                    {item.title || item.productName || "Product"}
                  </span>

                  <span className="font-medium">
                    ₹{item.price?.toLocaleString("en-IN")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* SHIPPING INFO */}
          <div>
            <div className="font-medium text-gray-700 mb-2">
              Shipping Info
            </div>

            <div className="text-gray-500 text-sm flex flex-col gap-1">
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>

        </div>

        {/* UPDATE BUTTON */}
        <Button
          onClick={() => handleUpdate(orderDetails?._id)}
          className="self-end"
        >
          Update Order Status
        </Button>

      </div>

    </DialogContent>
  );
};

export default OrderDetails;