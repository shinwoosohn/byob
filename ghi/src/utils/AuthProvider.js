import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = ({ token }) => {
  return token === null ? <Navigate to="/" /> : <Outlet />;
};

export default AuthProvider;
