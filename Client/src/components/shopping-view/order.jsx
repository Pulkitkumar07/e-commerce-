import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import OrderDetails from "@/pages/shopping-view/OrderDetails.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "@/store/actions/orderAction";
import { resetOrderDetails } from "@/store/reducers/orderSlice";

const ShopOrder = ({ orders = [] }) => {
  const dispatch = useDispatch();
  const { orderDetails } = useSelector((state) => state.orderList);
  const [openDetails, setOpenDetails] = useState(false);

  
  const handleOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };


  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetails(true);
    }
  }, [orderDetails]);


  const handleCloseDialog = () => {
    setOpenDetails(false);
    
    setTimeout(() => {
        dispatch(resetOrderDetails());
    }, 200);
  };

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-4">
      <Card className="shadow-sm border rounded-xl overflow-hidden">
        <CardHeader className="py-4">
          <CardTitle className="text-lg font-bold">Order History</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order._id} className="hover:bg-gray-50/50">
                      <TableCell className="font-mono text-xs text-gray-500 uppercase">
                        #{order._id.slice(-6)} {/* Showing last 6 chars for cleaner look */}
                      </TableCell>

                      <TableCell className="text-xs">
                        {new Date(order.orderDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            order.orderStatus === "Confirmed" || order.orderStatus === "Completed"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : order.orderStatus === "Cancelled"
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          }`}
                        >
                          {order.orderStatus}
                        </Badge>
                      </TableCell>

                      <TableCell className="font-bold text-sm">
                        ₹{order.totalAmount}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleOrderDetails(order._id)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-gray-400 text-sm">
                      No purchase history found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      
      <Dialog open={openDetails} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-xl text-center">Order Details</DialogTitle>
            <DialogDescription className="text-center">
              Check your delivery status and item summary below.
            </DialogDescription>
          </DialogHeader>

          {orderDetails ? (
            <div className="py-4">
               <OrderDetails order={orderDetails} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mb-2" />
              <p className="text-xs text-gray-500">Fetching details...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopOrder;