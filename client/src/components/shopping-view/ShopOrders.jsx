import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import ShopOrderDetails from "./ShopOrderDetails";
import { Dialog } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser, getOrderDetails } from "@/store/shop/orderSlice";

const ShopOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedOrderItem, setOrderItem] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersByUser(userId)).then((data) => {
      console.log(data);
      if (data.payload?.success) {
        setOrderList(data.payload?.data);
      }
    });
  }, []);

  const handleOrderDetails = (orderId) => {
    setOpenDetailsDialog(true)
    dispatch(getOrderDetails(orderId)).then(data => {
      console.log(data);
      if(data?.payload?.success)
      {
        setOrderDetails(data?.payload?.data)
      }
    })

  }

  console.log(orderList);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>
              <span className="sr-only">Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem._id}</TableCell>
                    <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                    <TableCell>{orderItem.orderStatus.toUpperCase()}</TableCell>
                    <TableCell>${orderItem.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={setOpenDetailsDialog}
                      >
                        <Button
                          onClick={() => {handleOrderDetails(orderItem._id),setOrderItem(orderItem)}}
                          className="cursor-pointer"
                        >
                          View Details
                        </Button>
                        <ShopOrderDetails orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
            
        </TableBody>
      </Table>
    </Card>
  );
};

export default ShopOrders;
