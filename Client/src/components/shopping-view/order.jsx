import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import OrderDetails from "@/pages/shopping-view/OrderDetails.jsx";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "@/store/actions/orderAction";
import { resetOrderDetails } from "@/store/reducers/orderSlice";
const ShopOrder = ({ orders }) => {

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderList.orderDetails);
  const [openDetails, setOpendetails] = useState(false);

  const handleOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };

  useEffect(() => {
    if (orderDetails) {
      setOpendetails(true);
    }
  }, [orderDetails]);

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4">

      <Card className="shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold">
            Order History
          </CardTitle>
        </CardHeader>

        <CardContent>

          {/* 🔥 Important: scroll wrapper */}
          <div className="w-full overflow-x-auto">

            <Table className="min-w-[600px]">

              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order._id}>

                      <TableCell className="font-medium max-w-[120px] truncate">
                        {order._id}
                      </TableCell>

                      <TableCell className="text-sm">
                        {new Date(order.orderDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={
                            order.orderStatus === "Completed"
                              ? "bg-green-100 text-green-700"
                              : order.orderStatus === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {order.orderStatus}
                        </Badge>
                      </TableCell><TableCell>
                        <Badge
                          className={
                            order.orderStatus === "Completed"
                              ? "bg-green-100 text-green-700"
                              : order.orderStatus === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {order.orderStatus}
                        </Badge>
                      </TableCell>

                      <TableCell className="font-semibold text-sm">
                        ₹{order.totalAmount}
                      </TableCell>

                      <TableCell>
                        <Dialog
                          open={openDetails}
                          onOpenChange={(open) => {
                            setOpendetails(open);

                            if (!open) {
                              dispatch(resetOrderDetails());
                            }
                          }}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOrderDetails(order._id)}
                          >
                            View
                          </Button>

                          <OrderDetails orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-400"
                    >
                      No Orders Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>

          </div>

        </CardContent>
      </Card>

    </div>
  );
};

export default ShopOrder;