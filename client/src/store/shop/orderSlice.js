import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      `http://localhost:5001/api/shop/order/create`,
      orderData
    );
    console.log(response.data);
    alert("Passing createNewOrder");
    return response.data;
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "/orders/orderList",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5001/api/shop/order/list/${userId}`
    );

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (orderId) => {
    const response = await axios.get(
      `http://localhost:5001/api/shop/order/detail/${orderId}`
    );

    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      `http://localhost:5001/api/shop/order/capture`,
      {
        paymentId,
        payerId,
        orderId,
      }
    );

    return response.data;
  }
);

const shopOrderSlice = createSlice({
  name: "shopOrders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        alert("Passing createNewOrder pending");
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        alert("Passing createNewOrder fullfilled");
        (state.isLoading = false),
          (state.approvalURL = action.payload?.approvalURL),
          (state.orderId = action.payload?.orderId);
        sessionStorage.setItem(
          "currentOrderID",
          JSON.stringify(action?.payload?.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        (state.isLoading = false),
          (state.approvalURL = null),
          (state.orderId = null);
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orderList = action.payload?.data);
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        (state.isLoading = false), (state.orderList = []);
      });
  },
});

export default shopOrderSlice.reducer;
