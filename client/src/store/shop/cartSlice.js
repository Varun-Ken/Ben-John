import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  cartItems: [],
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    console.log(userId,productId,quantity);
    const response = await axios.post(
      "http://localhost:5001/api/shop/cart/add",
      { userId, productId, quantity }
    );

    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5001/api/shop/cart/get/${userId}`
    );

    return response.data;
  }
);

export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async ({ userId, productId }) => {
    console.log(userId,productId);
    const response = await axios.delete(
      `http://localhost:5001/api/shop/cart/delete/${userId}/${productId}`
    );

    return response.data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `http://localhost:5001/api/shop/cart/updatecart`,
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

const shopCartSlice = createSlice({
  name: "cartProducts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      (state.isLoading = false), (state.cartItems = action.payload?.data);
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      (state.isLoading = false), (state.cartItems = []);
    });
    builder.addCase(fetchCartItems.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      (state.isLoading = false), (state.cartItems = action.payload?.data);
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      (state.isLoading = false), (state.cartItems = []);
    });
    builder.addCase(updateCartQuantity.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      (state.isLoading = false), (state.cartItems = action.payload?.data);
    });
    builder.addCase(updateCartQuantity.rejected, (state, action) => {
      (state.isLoading = false), (state.cartItems = []);
    });
    builder.addCase(deleteCartItems.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCartItems.fulfilled, (state, action) => {
      (state.isLoading = false), (state.cartItems = action.payload?.data);
    });
    builder.addCase(deleteCartItems.rejected, (state, action) => {
      (state.isLoading = false), (state.cartItems = []);
    });
  },
});

export default shopCartSlice.reducer;
