const base_url = "auth/v1/dashboard";

const authEndpoints = {
  LOGIN: `${base_url}/login`,
  FORGET_PASSWORD: `${base_url}/forget_password`,
  RECEIVE_OTP: `${base_url}/receive-otp`,
  VERIFY_OTP: `${base_url}/otp`,
  NEW_PASSWORD: `${base_url}/update_password`,
  CREATE_PASSWORD_AFTER_LOGIN: "/admins/v1/dashboard/reset-password-after-login",
  PERMISSIONS: "/access-control/v1/dashboard/permissions",
};

export default authEndpoints;
