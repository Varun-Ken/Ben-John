import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    cartId: String,
    cartItems: [
      {
        productId: String,
        title: String,
        price: String,
        salePrice: String,
        quantity : Number,
      },
    ],
    addressInfo: {
      addressId: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
      notes: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
