import React, { useEffect, useState } from "react";
import accImg from "../../assets/account.jpg";
import ShopAddress from "@/components/shopping-view/ShopAddress";
import { useDispatch, useSelector } from "react-redux";
import UserCartItems from "@/components/shopping-view/UserCartItems";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/orderSlice";
import { toast } from "sonner";

const ShopCheckout = () => {
  const { cartItems } = useSelector((state) => state.cartProducts);
  const { user } = useSelector((state) => state.auth);
  const cartItemsList = cartItems.items;

  const [totalCartValue, setTotalCartValue] = useState(0);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [approvalURLVal, setApprovalURLVal] = useState("");
  const dispatch = useDispatch();
  let approvalURL = "";
  const handlePaypalPayment = () => {
    if (currentAddress == null) {
      toast("⚠Please Select an Address to Deliver!");
    } else {
      const orderData = {
        userId: user.id,
        cartId: cartItems._id,
        cartItems: cartItemsList.map((cartItem) => ({
          productId: cartItem.productId,
          title: cartItem.title,
          price: cartItem.price,
          salePrice: cartItem?.salePrice > 0 ? cartItem?.salePrice : 0,
          quantity: cartItem.quantity,
        })),
        addressInfo: {
          addressId: currentAddress._id,
          address: currentAddress.address,
          city: currentAddress.city,
          state: currentAddress.state,
          pincode: currentAddress.pincode,
          phone: currentAddress.phone,
          notes: currentAddress.notes,
        },
        orderStatus: "pending",
        paymentMethod: "paypal",
        paymentStatus: "pending",
        totalAmount: totalCartValue,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
        paymentId: "",
        payerId: "",
      };
      console.log(orderData);

      dispatch(createNewOrder(orderData)).then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          setIsPaymentStart(true);
          let approvalURL = data?.payload?.approvalURL;
          sessionStorage.setItem(
            "currentOrderID",
            JSON.stringify(data?.payload?.orderId)
          );

          alert(data.payload?.orderId);
          window.location.href = approvalURL;
        } else {
          setIsPaymentStart(false);
        }
      });
    }
  };

  if (approvalURL) {
  }

  useEffect(() => {
    if (cartItemsList && cartItemsList.length > 0) {
      const totalAmount = cartItemsList.reduce(
        (tot, cartItem) =>
          tot +
          (cartItem.salePrice
            ? cartItem.salePrice * cartItem.quantity
            : cartItem.price * cartItem.quantity),
        0
      );
      setTotalCartValue(totalAmount);
    } else {
      setTotalCartValue(0);
    }
  }, [cartItems]);

  let isCheckoutAllowed = cartItemsList?.length <= 0 ? true :false

  console.log(isCheckoutAllowed);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <ShopAddress
          currentAddress={currentAddress}
          setCurrentAddress={setCurrentAddress}
        />
        <div className="flex flex-col gap-5">
          {cartItemsList && cartItemsList.length > 0
            ? cartItemsList.map((cartItem) => (
                <UserCartItems cartItem={cartItem} />
              ))
            : null}
          <div className="mt-8">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartValue}</span>
            </div>
            <Button
              className="w-full mt-4 cursor-pointer"
              onClick={() => handlePaypalPayment()}
              disabled={isCheckoutAllowed}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCheckout;
