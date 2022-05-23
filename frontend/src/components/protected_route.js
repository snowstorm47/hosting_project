import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role = "admin", children }) => {
  const data =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  if (!data || data.user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
