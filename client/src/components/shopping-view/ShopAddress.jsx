import React, { useEffect, useState } from "react";
import CommonForm from "../common/CommonForm";
import { addressFormControls } from "@/config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/addressSlice";
import AddressCard from "./AddressCard";
import { toast } from "sonner";

const ShopAddress = ({currentAddress,setCurrentAddress}) => {
  const initialFormData = {
    address: "",
    city: "",
    phone: "",
    state: "",
    pincode: "",
    notes: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [addressList, setAddressList] = useState([]);
  const [currentAddressId, setCurrentAddressId] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //console.log(user);

  const handleAddress = (e) => {
    e.preventDefault();
    if (currentAddressId === "") {
      dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
        (data) => {
          if (data?.payload?.success) {
            toast("✅ Address Added Successfully");
          }
        }
      );
    } else {
      dispatch(editAddress({ addressId : currentAddressId, userId: user?.id, formData })).then((data) => {
        if (data?.payload?.success) {
          console.log(data);
          toast("📍 Address has been Updated");
        }
      });
    }
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id)).then((data) => {
      if (data?.payload?.success) {
        console.log(data);
        setAddressList(data?.payload?.address);
      }
    });
  }, []);

  const validForm = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim !== "")
      .every((item) => item);
  };

  return (
    <Card>
      {addressList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-3 gap-3">
          {addressList.map((addressItem) => (
            <AddressCard
            
              addressInfo={addressItem}
              userId={user.id}
              setAddress={setFormData}
              setCurrentAddressId={setCurrentAddressId}
              currentAddress ={currentAddress}
              setCurrentAddress={setCurrentAddress}
            />
          ))}
        </div>
      ) : null}
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl font-semibold">Add New Address</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddress}
          buttonText={currentAddressId === "" ? "Save" : "Update"}
        />
      </CardContent>
    </Card>
  );
};

export default ShopAddress;
