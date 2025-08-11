import { apiPost, apiPut } from "@/utils/apiCall";
import authEndpoints from "./authEndpoints";

interface Permission {
  id: string;
  name: string;
  section: string;
  sub_section: string;
  display_order: number;
}

interface Permissions {
  [section: string]: {
    [subSection: string]: Permission[];
  };
}

interface Role {
  id: string;
  name: string;
  scope: string;
  permissions: Permissions;
}

interface Admin {
  id: string;
  first_name: string;
  last_name: string;
  image: string;
  title: string | null;
  code: string | null;
  phone_number: string;
  email: string;
  has_set_password: boolean;
  status: string;
  role_id: string | null;
  created_at: string;
  role?: Role;
}

interface LoginResponse {
  success: boolean;
  error: string | null;
  token: string;
  admin: Admin;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface ForgetPasswordData {
  email: string;
}

interface VerifyOtpData {
  email: string;
  otp: string;
}

interface NewPasswordData {
  email: string;
  otp: string;
  password: string;
}

interface CreatePasswordData {
  password: string;
}

const authServices = {
  login: async (data: LoginCredentials): Promise<LoginResponse> => {
    try {
      console.log("authServices.login called with:", data);
      const response = await apiPost(authEndpoints.LOGIN, data);
      console.log("authServices.login response:", response);

      if (!response?.admin || !response?.token) {
        throw new Error("Invalid response structure: missing admin or token");
      }

      return {
        success: true,
        error: null,
        token: response.token,
        admin: response.admin,
      };
    } catch (error: any) {
      console.error("authServices.login error:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        error,
      });
      throw error;
    }
  },
  forgetPassword: (data: ForgetPasswordData) => apiPost(authEndpoints.FORGET_PASSWORD, data),
  verifyOtp: (data: VerifyOtpData) => apiPost(authEndpoints.VERIFY_OTP, data),
  newPassword: (data: NewPasswordData) => apiPut(authEndpoints.NEW_PASSWORD, data),
  createPasswordAfterLogin: (data: CreatePasswordData) =>
    apiPut(authEndpoints.CREATE_PASSWORD_AFTER_LOGIN, data),
};

export default authServices;
