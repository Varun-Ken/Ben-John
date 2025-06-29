import AdminOrderDetails from "@/components/admin-view/AdminOrderDetails";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders } from "@/store/admin/orderSlice";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const [selectedOrderItem, setOrderItem] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders()).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        setOrderList(data?.payload?.data);
      }
    });
  }, []);

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
          {orderList?.length > 0
            ? orderList.map((orderItem) => (
                <TableRow key={orderItem._id}>
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
                        onClick={() => {setOpenDetailsDialog(true);setOrderItem(orderItem)}}
                        className="cursor-pointer"
                      >
                        View Details
                      </Button>
                      <AdminOrderDetails orderDetails={selectedOrderItem} />
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

export default AdminOrders;
