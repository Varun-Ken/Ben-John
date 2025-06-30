import React, { useEffect, useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "@/store/shop/orderSlice";

const ShopOrderDetails = ({orderDetails}) => {

  console.log("detail", orderDetails);
  let addressDetail = orderDetails.addressInfo;
  let cartItems = orderDetails.cartItems || [];
  console.log("Cart", cartItems);
  console.log("Address", addressDetail);


  return orderDetails !== undefined ? (
    <DialogContent className="sm:max-[600px] max-h-[600px] overflow-y-auto">
      <div className="grid gap-6 mt-5">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails._id}</Label>
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
            <Label>${orderDetails.totalAmount}</Label>
          </div>
        </div>
      </div>

      <Separator />
      <div className="grid gap-3">
        <div className="font-medium">Order Details</div>
        <ul className="grid gap-3">
          {cartItems?.length > 0
            ? cartItems?.map((cartItem) => (
                <li className="flex items-center justify-between">
                  <span>{cartItem.title}</span>
                  <span>
                    ${cartItem.salePrice > 0
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
    </DialogContent>
  ) : null;
};

export default ShopOrderDetails;
