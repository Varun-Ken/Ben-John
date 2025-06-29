import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/admin/products",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5001/api/admin/products/add",
      formData
    );

    return response.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/admin/fetchallproducts",
  async () => {
    const response = await axios.get(
      "http://localhost:5001/api/admin/products/get"
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5001/api/admin/products/delete/${id}`
    );
    return response?.data;
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:5001/api/admin/products/edit/${id}`,
      formData
    );
    return response?.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      (state.isLoading = false), (state.productList = null);
    });
    builder.addCase(addNewProduct.rejected, (state, action) => {
      (state.isLoading = false), (state.productList = null);
    });
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.productList = action.payload.listOfProducts);
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      (state.isLoading = false), (state.productList = null);
    });
  },
});

export default adminProductSlice.reducer;
