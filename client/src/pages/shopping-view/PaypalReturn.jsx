import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/orderSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

const PaypalReturn = () => {
  const dispatch = useDispatch();
  //const location = useParams()
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  const orderId = JSON.parse(sessionStorage.getItem("currentOrderID"));

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        capturePayment({
          paymentId,
          payerId,
          orderId,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderID");
          window.location.href = "paypal-success";
        }
      });
    }, 2000);
  }, []);
  console.log("Payment", paymentId, payerId);
  console.log("Order ID", orderId);

  return (
    <Card className="h-[300px]">
      <CardHeader>
        <CardTitle className="text-center">
          <span className="loading loading-spinner text-primary size-10 mb-3"></span>
          <h3>Processing Payment... Please Wait</h3>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturn;
