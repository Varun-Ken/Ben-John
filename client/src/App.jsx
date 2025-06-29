import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminProducts from "./pages/admin-view/AdminProducts";
import ShopLayout from "./components/shopping-view/ShopLayout";
import NotFound from "./pages/NotFound/NotFound";
import ShopAccount from "./pages/shopping-view/ShopAccount";
import ShopCheckout from "./pages/shopping-view/ShopCheckout";
import ShopHome from "./pages/shopping-view/ShopHome";
import ShopListing from "./pages/shopping-view/ShopListing";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/NotFound/UnauthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkAuth } from "./store/authSlice/authSlice";
import PaypalReturn from "./pages/shopping-view/PaypalReturn";
import PaymentSuccessful from "./pages/shopping-view/PaymentSuccessful";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  setInterval(() => {
    setIsLoading(false);
  }, 100);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  //const isAuthenticated = true , user= {role : "admin"}

  if(isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-bars loading-2xl size-15"></span>
    </div>
  );

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <CheckAuth isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShopAccount />} />
          <Route path="checkout" element={<ShopCheckout />} />
          <Route path="home" element={<ShopHome />} />
          <Route path="listing" element={<ShopListing />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="paypal-success" element={<PaymentSuccessful />} />
        </Route>

        <Route path="/unauth" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
