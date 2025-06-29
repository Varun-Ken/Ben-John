import paypal from "../../helpers/paypal.js";
import Cart from "../../models/cart.js";
import Order from "../../models/order.js";
import User from "../../models/user.js";

export const getAllOrders = async (req, res) => {
  try {
    const orderList = await Order.find();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orderList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
    console.log("Error in getAllOrdersByUser controller:", error);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await updatedOrder.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.log("Error in updateOrderStatus controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
