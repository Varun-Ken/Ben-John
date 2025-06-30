import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async ({ reviewValue, reviewMsg, userId, productId }) => {
    const response = await axios.post(`http://localhost:5001/api/review/add`, {
      reviewValue,
      reviewMsg,
      userId,
      productId,
    });

    return response.data;
  }
);

export const getProductReviews = createAsyncThunk(
  "/order/getReviews",
  async (productId) => {
    const response = await axios.get(
      `http://localhost:5001/api/review/${productId}`
    );

    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer;
