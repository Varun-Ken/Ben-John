import paypal from "../../helpers/paypal.js";
import Cart from "../../models/cart.js";
import Order from "../../models/order.js";
import User from "../../models/user.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    // var create_payment_json = {
    //   intent: "sale",
    //   payer: {
    //     payment_method: "paypal",
    //   },
    //   redirect_urls: {
    //     return_url: "http://localhost:5173/shop/paypal-return",
    //     cancel_url: "http://localhost:5173/shop/paypal-cancel",
    //   },
    //   transactions: [
    //     {
    //       item_list: {
    //         items: cartItems.map((item) => ({
    //           name: item.title,
    //           sku: item.productId,
    //           price: item.price.toFixed(2),
    //           currency: "USD",
    //           quantity: item.quantity,
    //         })),
    //       },
    //       amount: {
    //         currency: "USD",
    //         total: totalAmount.toFixed(2),
    //       },
    //       description: "Description",
    //     },
    //   ],
    // };
    let priceTag = totalAmount.toFixed(2);

    var create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: priceTag,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: priceTag,
          },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
          error: error,
        });
      } else {
        const newOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newOrder.save();
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newOrder._id,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
    console.log("Error in Create Order controller:", error);
  }
};

export const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    const selectOrder = await Order.findById(orderId);
    if (!selectOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    selectOrder.orderStatus = "confirmed";
    selectOrder.paymentStatus = "paid";
    selectOrder.paymentMethod = "";
    selectOrder.paymentId = paymentId;
    selectOrder.payerId = payerId;

    await selectOrder.save();
    await Cart.findByIdAndDelete(selectOrder.cartId);

    res.status(200).json({
      success: true,
      message: "Order Confirmed",
      data: selectOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
    console.log("Error in Capture Payment controller:", error);
  }
};

export const getAllOrdersByUser = async (req, res) => {
  try {
    const {userId} = req.params

    const orderList = await Order.find({userId})

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

export const getOrderDetails = async (req, res) => {
  try {
    const {orderId} = req.params

    const orderDetails = await Order.findById(orderId)
    if (!orderDetails) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: orderDetails,
    });
  } catch (error) {
    console.log("Error in getOrderDetails controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
      })
    }
  };