import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/CommonForm";

const AdminOrderDetails = () => {
  const [formData, setFormData] = useState({ status: "" });
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

  const handleStatus = (e) => {
    e.preventDefault();
  };

  return (
    <DialogContent className="sm:max-[600px] max-h-[600px] overflow-y-hidden">
      <div className="grid gap-6 mt-5">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>58393</Label>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label> 12/5/2025</Label>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>In Progress</Label>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Price</p>
            <Label>$520</Label>
          </div>
        </div>
      </div>

      <Separator />
      <div className="grid gap-3">
        <div className="font-medium">Order Details</div>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span>Product #1</span>
            <span>$135</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Product #2</span>
            <span>$370</span>
          </li>
        </ul>
      </div>

      <Separator />
      <div className="grid gap-2">
        <div className="font-medium">Shipping Details</div>
        <div className="grid text-gray-600">
          <span>Jason</span>
          <span>32, Roseline Street</span>
          <span>Theni</span>
          <span>Tamil Nadu</span>
        </div>
      </div>
      <Separator />
      <div className="">
        <CommonForm
          formControls={orderStatusControl}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleStatus}
        />
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;
