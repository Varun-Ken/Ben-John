import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessful = () => {
  const navigate = useNavigate()
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center -mt-50">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold">Your Payment is Successfully Completed</h1>
          <button
            className="btn btn-primary mt-5"
            onClick={() => navigate("/shop/home", { replace: true })}
          >
            Get Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
