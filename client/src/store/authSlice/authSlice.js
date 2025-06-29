import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5001/api/auth/register",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5001/api/auth/login",
    formData,
    { withCredentials: true }
  );
  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout",
  async() => {
    const response = await axios.post("http://localhost:5001/api/auth/logout", {}, { withCredentials: true });
    return response.data;
  }
)

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(
    "http://localhost:5001/api/auth/check-auth",
    { withCredentials: true }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = action?.payload?.success ? true : false;
      state.user = action?.payload?.success ? action.payload.user : null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(checkAuth.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = action?.payload?.success ? true : false;
      state.user = action?.payload?.success ? action.payload.user : null;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
