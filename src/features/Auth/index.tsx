import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import ReceiveOtp from "./pages/ReceiveOtp";
import VerifyOtp from "./pages/VerifyOtp";
import NewPassword from "./pages/NewPassword";
import ForgetPassword from "./pages/ForgetPassword";
import authRoutes from "./AuthRoutes";
import CreatePassword from "./pages/CreatePassword";

function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={authRoutes.LOGIN} element={<Login />} />
        <Route path={authRoutes.FORGET_PASSWORD} element={<ForgetPassword />} />
        <Route path={authRoutes.RECEIVE_OTP} element={<ReceiveOtp />} />
        <Route path={authRoutes.VERIFY_OTP} element={<VerifyOtp />} />
        <Route path={authRoutes.NEW_PASSWORD} element={<NewPassword />} />
        <Route path={authRoutes.CREATE_PASSWORD} element={<CreatePassword />} />
      </Route>
    </Routes>
  );
}

export default AuthRoutes;
