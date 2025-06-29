import Address from "../../models/address.js";
import User from "../../models/user.js";

export const addAddress = async (req, res) => {
  try { 
    const { userId, address, city, pincode, state, phone, notes } = req.body;
    
    if (!userId || !address || !city || !pincode || !state || !phone) {
      return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
    }
 
    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      state,
      phone,
      notes,
    });
   
    await newAddress.save();
    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
    console.log("Address added successfully");
  } catch (error) {
    console.error("Error addAddress Controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const addressList = await Address.find({ userId });

    if (!addressList) {
      return res
        .status(404)
        .json({ success: false, message: "No addresses found" });
    }
    res.status(200).json({
      success: true,
      message: "Addresses fetched successfully",
      address: addressList,
    });
  } catch (error) {
    console.error("Error fetchAllAddress Controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    const formData = req.body;

    const addressExist = await Address.findByIdAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );
    if (!addressExist) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address: addressExist,
    });
  } catch (error) {
    console.error("Error editAddress Controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    const address = await Address.findByIdAndDelete({ _id: addressId, userId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Error deleteAddress Controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
