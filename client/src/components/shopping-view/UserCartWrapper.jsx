import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItems from "./UserCartItems";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems,setOpenCartSheet }) => {
  const navigate = useNavigate()
  const [totalCartValue, setTotalCartValue] = useState(0);

  useEffect(() => {
    if(cartItems && cartItems.length > 0)
    {
      const totalAmount = cartItems.reduce((tot,cartItem) => tot + (
      cartItem.salePrice
        ?  cartItem.salePrice * cartItem.quantity
        : cartItem.price * cartItem.quantity
    ),0)
    setTotalCartValue(totalAmount)
    }
    else
    {
      setTotalCartValue(0)
    }
  },[cartItems])

  return (
    <SheetContent className="sm-max-w-md px-5">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <SheetDescription className="hidden"/>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((cartItem) => <UserCartItems cartItem={cartItem} />)
          : null}
      </div>
      <div className="mt-8">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartValue}</span>
        </div>
      </div>
      <Button className="cursor-pointer" onClick={() => { navigate("/shop/checkout"), setOpenCartSheet(false)}}>Checkout</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
