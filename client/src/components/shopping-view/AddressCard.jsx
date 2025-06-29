import React from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Delete, Edit, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteAddress, editAddress } from "@/store/shop/addressSlice";
import { toast } from "sonner";

const AddressCard = ({
  addressInfo,
  userId,
  setAddress,
  setCurrentAddressId,
  currentAddress,
  setCurrentAddress,
}) => {
  const dispatch = useDispatch();
  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress({ addressId, userId })).then((data) => {
      if (data?.payload?.success) {
        console.log(data);
        toast("🚮 Address has been Deleted");
      }
    });
  };

  return (
    <Card
      className={
        currentAddress?._id === addressInfo._id
          ? "border-3 border-green-500 cursor-pointer"
          : "cursor-pointer"
      }
      onClick={() => setCurrentAddress(addressInfo)}
    >
      <CardContent className="grid gap-3">
        <div className="flex flex-row justify-end gap-3">
          <Edit
            className="cursor-pointer"
            title="Edit"
            onClick={() => {
              setAddress(addressInfo), setCurrentAddressId(addressInfo._id);
            }}
          />
          <Trash
            className="cursor-pointer"
            title="Delete"
            onClick={() => handleDeleteAddress(addressInfo._id)}
          />
        </div>
        <Label>Address : {addressInfo?.address}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>State : {addressInfo?.state}</Label>
        <Label>Pincode : {addressInfo?.pincode}</Label>
        <Label>Phone : {addressInfo?.phone}</Label>
        <Label>Notes : {addressInfo?.notes}</Label>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
