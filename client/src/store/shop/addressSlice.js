import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : true,
    addressList : []
}

export const addNewAddress = createAsyncThunk("address/add", async(formData) => {
    const response = await axios.post("http://localhost:5001/api/shop/address/add", formData)
    return response.data
})

export const fetchAllAddress = createAsyncThunk("address/get", async(userId) => {
    const response = await axios.get(`http://localhost:5001/api/shop/address/get/${userId}`)
    return response.data
})

export const editAddress = createAsyncThunk("address/edit", async({userId, addressId,formData}) => {
    const response = await axios.put(`http://localhost:5001/api/shop/address/edit/${userId}/${addressId}`, formData)
    return response.data
})

export const deleteAddress = createAsyncThunk("address/delete", async({userId,addressId}) => {
    const response = await axios.delete(`http://localhost:5001/api/shop/address/delete/${userId}/${addressId}`)
    return response.data
})

 const addressSlice = createSlice({
    name : "address",
    initialState : initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(addNewAddress.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addNewAddress.fulfilled, (state) => {
            state.isLoading = false
        })
        .addCase(addNewAddress.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(fetchAllAddress.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchAllAddress.fulfilled, (state,action) => {
            state.isLoading = false
            state.addressList = action?.payload?.data
        })
        .addCase(fetchAllAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = []
        })
    }
 })

 export default addressSlice.reducer