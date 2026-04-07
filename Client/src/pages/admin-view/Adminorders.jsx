import React, { useState, useEffect } from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

import Orderdetails from "./Order-details"
import { useDispatch, useSelector } from "react-redux"
import {
  GetAllOrders,
  GetOrderDetails,
  removeOrderDetails
} from "@/store/actions/adminOrderAction"

const AdminOrder = () => {
  const dispatch = useDispatch()

  const orders = useSelector((state) => state.adminOrder.OrderList)
  const orderDetails = useSelector((state) => state.adminOrder.orderDetails)

  useEffect(() => {
    dispatch(GetAllOrders())
  }, [dispatch])

  const handleOrderDetails = (orderId) => {
    dispatch(GetOrderDetails(orderId))
  }

  const handleCloseDialog = () => {
    dispatch(removeOrderDetails())
  }

  return (
    <div className="p-4">

      <Card className="rounded-xl shadow-sm border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            All Orders
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>

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
              {orders?.map((order) => (
                <TableRow key={order._id}>

                  <TableCell>{order._id}</TableCell>

                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : order.orderStatus === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>

                  <TableCell>₹{order.totalAmount}</TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOrderDetails(order._id)}
                    >
                      View
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardContent>
      </Card>

      {/* Dialog controlled ONLY by redux state */}
      <Dialog
        open={!!orderDetails}
        onOpenChange={(open) => {
          if (!open) handleCloseDialog()
        }}
      >
        <DialogContent>
          <Orderdetails orderDetails={orderDetails} />
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AdminOrder