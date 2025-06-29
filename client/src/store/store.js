import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import adminProductsSlice from "./admin/productSlice";
import shopProductsSlice from "./shop/shopSlice";
import shopCartSlice from "./shop/cartSlice";
import shopAddressSlice from "./shop/addressSlice";
import shopOrderSlice from "./shop/addressSlice";
import adminOrderSlice from "./admin/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shopProductsSlice,
    cartProducts: shopCartSlice,
    shopAddress : shopAddressSlice,
    shopOrders : shopOrderSlice,
    adminOrders : adminOrderSlice
  },
});

export default store;
