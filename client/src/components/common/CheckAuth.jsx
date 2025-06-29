import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  let locationPath = location.pathname;

  if (
    !isAuthenticated &&
    !(
      locationPath.includes("/auth/register") ||
      locationPath.includes("/auth/login")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (locationPath.includes("/auth/register") ||
      locationPath.includes("/auth/login"))
  ) {
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    else return <Navigate to="/shop/home" />;
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    locationPath.includes("/admin")
  ) {
    return <Navigate to="/unauth" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    locationPath.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
