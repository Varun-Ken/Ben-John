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
import React, { useState } from "react";

const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
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
          <TableRow>
            <TableCell>58393</TableCell>
            <TableCell>12/5/2025</TableCell>
            <TableCell>In Progress</TableCell>
            <TableCell>$520</TableCell>
            <TableCell>
              <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                <Button onClick={() => setOpenDetailsDialog(true)} className="cursor-pointer">View Details</Button>
                <AdminOrderDetails />
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default AdminOrders;
