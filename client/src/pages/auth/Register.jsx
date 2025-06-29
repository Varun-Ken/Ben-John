import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/authSlice/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const errorState = {
  target: "",
  message: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [errorArr, setErrorArr] = useState(errorState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log(data, data?.payload?.status);
      if (data?.payload?.success) {
        navigate("/auth/login");
        setErrorArr({})
        toast(`✅ ${data?.payload?.message}`);
      } else {
        toast(`❌ ${data?.payload?.message}`);
      }
      setErrorArr({target:data?.payload?.target, message:data?.payload?.message})
      console.log(errorArr);
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create New Account</h1>
        Already have an account ?
        <Link to="/auth/login" className="text-blue-600 mx-2">
          Login
        </Link>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        errorArr={errorArr}
        setErrorArr={setErrorArr}
        buttonText="Sign Up"
        onSubmit={registerSubmit}
      />
    </div>
  );
};

export default Register;
