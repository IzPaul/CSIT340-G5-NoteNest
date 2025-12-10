import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export default function ProtectedRoute() {
  const user = getUser();
  
  if (!user?.userId) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}