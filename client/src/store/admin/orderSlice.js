import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  orderList: [],
};

export const getAllOrders = createAsyncThunk("/orders/orderList", async () => {
  const response = await axios.get(`http://localhost:5001/api/admin/orders`);

  return response.data;
});

export const updateOrderStatus = createAsyncThunk(
  "/orders/updateOrderStatus",  async ({orderId,status}) =>{
    const response = await axios.post(`http://localhost:5001/api/admin/update/${orderId}`,{
      status
    })
    
     return response.data
  })

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orderList = action.payload?.data);
      })
      .addCase(getAllOrders.rejected, (state) => {
        (state.isLoading = false), (state.orderList = []);
      });
  },
});

export default adminOrderSlice.reducer;
