import React from "react";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectedRoute = ({ children, ...rest }) => {
  let user;
  const getUser = () => {
    user = JSON.parse(localStorage.getItem("user"));
  };
  getUser();

  return user ? children : <LoadingToRedirect />;
};

export default ProtectedRoute;
