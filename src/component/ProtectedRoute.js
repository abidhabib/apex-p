// Protected.js
import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";

function Protected({ children }) {
  const { checklogin, paymentOk, } = useAuth();

  if (!checklogin) {
    return <Navigate to="/login" replace />;
  } else if (!paymentOk) {
    return <Navigate to="/pyment" replace />;
  } else {
    return <Route element={children} />;
  }
}

export default Protected;
