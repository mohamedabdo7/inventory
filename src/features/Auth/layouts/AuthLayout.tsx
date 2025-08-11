import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-600">
      AuthLayout
      <Outlet />
    </div>
  );
};

export default AuthLayout;
