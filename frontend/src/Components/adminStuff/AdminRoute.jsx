/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state.sahara);
  const isAuthenticated = user.logged && user.role === "admin";

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? children : <Navigate to='/user/login' replace />
      }
    />
  );
};

export default AdminRoute;
