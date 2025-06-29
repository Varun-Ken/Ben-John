import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartQuantity } from "@/store/shop/cartSlice";
import { toast } from "sonner";

const UserCartItems = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDelete = (userId,productId) => {
    dispatch(deleteCartItems({ userId, productId })).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast("🚮 Product is removed from the Cart");
      }
    });
  };

  const handleUpdateQuantity = ( cartItem, type) => {
    let newQuantity = cartItem.quantity;
    if (type == "increment") {
      newQuantity = 1 + cartItem.quantity;
    } else if (type == "decrement" && cartItem.quantity > 1) {
      newQuantity = cartItem.quantity - 1;
    }

    dispatch(
      updateCartQuantity({
        userId: user.id,
        productId: cartItem.productId,
        quantity: newQuantity,
      })
    ).then((data) => console.log(data));
  };

  return (
    <div className="flex items-center" key={cartItem.productId}>
      <div className="flex-1">
        <h3 className="font-semibold my-2">{cartItem.title}</h3>
        <div className="flex items-center">
          <Button
            onClick={() => handleUpdateQuantity( cartItem, "decrement")}
            variant="outline"
            className="rounded-lg"
            size="icon"
          >
            <Minus />
          </Button>
          <span className="mx-3">{cartItem.quantity}</span>
          <Button
            onClick={() => handleUpdateQuantity( cartItem, "increment")}
            variant="outline"
            className="rounded-lg"
            size="icon"
          >
            <Plus />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {cartItem.salePrice
            ? cartItem?.salePrice * cartItem?.quantity
            : cartItem?.price * cartItem?.quantity}
        </p>
        <Trash
          className="cursor-pointer"
          onClick={() => handleDelete(user.id,cartItem.productId)}
        />
      </div>
    </div>
  );
};

export default UserCartItems;
