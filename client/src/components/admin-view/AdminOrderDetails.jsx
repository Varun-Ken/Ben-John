import React, { useEffect, useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/CommonForm";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "@/store/admin/orderSlice";
import { toast } from "sonner";

const AdminOrderDetails = ({ orderDetails }) => {
  const [formData, setFormData] = useState({ status: orderDetails.orderStatus || "" });
  const dispatch = useDispatch()
  const orderStatusControl = [
    {
      label: "Order Status",
      name: "status",
      componentType: "select",
      options: [
        { id: "pending", label: "Pending" },
        { id: "process", label: "In Process" },
        { id: "shipping", label: "In Shipping" },
        { id: "rejected", label: "Rejected" },
        { id: "delivered", label: "Delivered" },
      ],
    },
  ];

  const handleStatus = (e,orderId,formData) => {
    e.preventDefault();
    console.log(orderId,formData.status);
    dispatch(updateOrderStatus({orderId,status :formData.status})).then(data => {
      console.log(data);
      if(data?.payload?.success)
      {
        toast("🚦 Order Staus has been Updated")
      }
    }) 
  };
  
  let addressDetail = orderDetails.addressInfo;
  let cartItems = orderDetails.cartItems || [];


  return (
    <DialogContent className="sm:max-[600px] max-h-[600px] overflow-y-auto">
      <DialogTitle/>
      <div className="grid gap-6 mt-5">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label> {orderDetails?.orderDate}</Label>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>{orderDetails?.orderStatus}</Label>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
        </div>
      </div>

      <Separator />
      <div className="grid gap-3">
        <div className="font-medium">Order Details</div>
        <ul className="grid gap-3">
          {cartItems?.length > 0
            ? cartItems?.map((cartItem) => (
                <li className="flex items-center justify-between" key={cartItem.title}>
                  <span>{cartItem.title}</span>
                  <span>
                    $
                    {cartItem.salePrice > 0
                      ? cartItem.salePrice * cartItem.quantity
                      : cartItem.price * cartItem.quantity}
                  </span>
                </li>
              ))
            : null}
        </ul>
      </div>

      <Separator />
      <div className="grid gap-2">
        <div className="font-medium">Shipping Details</div>
        <div className="grid text-gray-600">
          <span>{addressDetail?.address}</span>
          <span>{addressDetail?.city}</span>
          <span>{addressDetail?.pincode}</span>
          <span>{addressDetail?.state}</span>
          <span>{addressDetail?.phone}</span>
        </div>
      </div>
      <Separator />
      <div className="">
        <CommonForm
          formControls={orderStatusControl}
          formData={formData}
          setFormData={setFormData}
          onSubmit={(e) => handleStatus(e,orderDetails._id,formData)}
        />
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;
