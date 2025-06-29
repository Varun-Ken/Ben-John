import CommonForm from "@/components/common/CommonForm";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/authSlice/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  password: "",
};

const errorState = {
  target: "",
  message: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [errorArr, setErrorArr] = useState(errorState);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        console.log(data);
        setErrorArr({})
        navigate("/shop/home")
      }
      else
      {
        setErrorArr({target:data?.payload?.target, message:data?.payload?.message})
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sign In to your Account</h1>
        Don't have a Account ?
        <Link to="/auth/register" className="text-blue-600 mx-2">
          Register
        </Link>
        <CommonForm
          formControls={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          errorArr={errorArr}
          setErrorArr={setErrorArr}
          buttonText="Sign In"
          onSubmit={loginSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
