import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  productList: [],
  productDetails: null,
};

export const fetchFilteredProducts = createAsyncThunk(
  "/shop/fetchallproducts",
  async ({filterParams,sortParams}) => {
    const query = new URLSearchParams({...filterParams,sortBy: sortParams})
    
    const response = await axios.get(
      `http://localhost:5001/api/shop/products/get?${query}`
    );
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/shop/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5001/api/shop/products/get/${id}`
    );
    return response.data;
  }
);

const shopProductSlice = createSlice({
  name: "shopProducts",
  initialState: initialState,
  reducers: {
    setProductDetails : (state,action) => {
      state.productDetails = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      (state.isLoading = false), (state.productList = action.payload.data);
    });
    builder.addCase(fetchFilteredProducts.rejected, (state, action) => {
      (state.isLoading = false), (state.productList = null);
    });
    builder.addCase(fetchProductDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      (state.isLoading = false), (state.productDetails = action.payload.data);
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      (state.isLoading = false), (state.productDetails = null);
    });
  },
});


export const {setProductDetails} = shopProductSlice.actions

export default shopProductSlice.reducer;
