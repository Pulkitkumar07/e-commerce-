import { DialogContent } from '@/components/ui/dialog';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import {
  updateOrderStatus,
  GetOrderDetails,
  GetAllOrders
} from '@/store/actions/adminOrderAction.js';
import { toast } from 'react-toastify';
import { getOrderStatusClass } from '@/lib/orderStatus.js';

const OrderDetails = ({ orderDetails }) => {
  const dispatch = useDispatch();

  const [selectedStatusByOrder, setSelectedStatusByOrder] = useState({});
  const status = selectedStatusByOrder[orderDetails?._id] || orderDetails?.orderStatus || '';

  const handleUpdate = async (orderId) => {
    if (!status) return;
    
    try {
      
      await dispatch(updateOrderStatus(orderId, status));
      
      
      dispatch(GetOrderDetails(orderId));
      dispatch(GetAllOrders());
      
      toast.success('Order status updated successfully!');
    } catch (error) {
      toast.error(error.normalizedMessage || "Failed to update status");
    }
  };

  return (
    <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-xl">
      <div className="flex flex-col max-h-[90vh]">
        
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold">Order Management</h2>
              <p className="text-xs text-gray-500 font-mono">ID: {orderDetails?._id}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-gray-400 font-bold">Date</p>
              <p className="text-sm font-semibold">
                {orderDetails?.orderDate ? new Date(orderDetails.orderDate).toLocaleDateString("en-IN") : 'N/A'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border">
            <div className="space-y-1">
              <p className="text-[10px] uppercase text-gray-400 font-bold">Payment Status</p>
              <p className="text-sm font-medium">{orderDetails?.paymentStatus}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase text-gray-400 font-bold">Method</p>
              <p className="text-sm font-medium">{orderDetails?.paymentMethod}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase text-gray-400 font-bold">Total Amount</p>
              <p className="text-sm font-bold text-green-600">₹{orderDetails?.totalAmount?.toLocaleString('en-IN')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase text-gray-400 font-bold">Current Status</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getOrderStatusClass(orderDetails?.orderStatus)}`}>
                {orderDetails?.orderStatus}
              </span>
            </div>
          </div>

    
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <p className="font-bold text-gray-700">Shipping Address</p>
              <p className="text-gray-500 leading-tight">
                {orderDetails?.addressInfo?.address},<br />
                {orderDetails?.addressInfo?.pincode}<br />
                {orderDetails?.addressInfo?.phone}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-gray-700">Items ({orderDetails?.cartItems?.length})</p>
              <div className="max-h-[60px] overflow-y-auto">
                {orderDetails?.cartItems?.map((item, i) => (
                  <p key={i} className="text-gray-500 truncate">• {item.title} (₹{item.price})</p>
                ))}
              </div>
            </div>
          </div>

          <hr />

       
          <div className="space-y-3">
            <p className="text-sm font-bold">Change Order Status</p>
            <div className="flex gap-2">
              <select
                className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                value={status}
                onChange={(e) =>
                  setSelectedStatusByOrder((previousStatus) => ({
                    ...previousStatus,
                    [orderDetails._id]: e.target.value,
                  }))
                }
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <Button 
                onClick={() => handleUpdate(orderDetails?._id)}
                className="px-6"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default OrderDetails;
