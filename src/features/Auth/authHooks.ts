import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { t } from "i18next";
import authServices from "./authServices";
import authRoutes from "./AuthRoutes";
import responseErrorHandler from "@/utils/responseErrorHandler";
import { useAuthStore } from "@/store/authStore";

interface LoginCredentials {
  email: string;
  password: string;
}

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

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth, clearAuth } = useAuthStore();

  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      console.log("Mutation triggered with credentials:", credentials);
      return authServices.login(credentials);
    },
    onMutate: (credentials) => {
      console.log("Mutation started for:", credentials.email);
      return credentials;
    },
    onSuccess: (res: LoginResponse) => {
      console.log("useLogin called");
      console.log("Login response:", res);
      if (res.success) {
        setAuth(res.admin, res.token);
        toast.success(t("auth.loginSuccess"));
        if (res.admin.has_set_password) {
          console.log("Navigating to HOME:", authRoutes.HOME);
          navigate(authRoutes.HOME);
        } else {
          console.log("Navigating to CREATE_PASSWORD:", authRoutes.CREATE_PASSWORD);
          navigate(authRoutes.CREATE_PASSWORD);
        }
      } else {
        clearAuth();
        toast.error(res.error || t("auth.loginFailed"));
      }
    },
    onError: (error: any) => {
      clearAuth();
      console.error("Login error:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        error,
      });
      responseErrorHandler(error);
    },
  });

  const handleLogin = (credentials: LoginCredentials) => {
    console.log("handleLogin called with:", credentials);
    login(credentials);
  };

  return { isLoggingIn, login: handleLogin };
};

// Other hooks unchanged
export const useForgetPassword = () => {
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: forgetPassword } = useMutation({
    mutationFn: authServices.forgetPassword,
    onSuccess: (_, data) => {
      navigate(`${authRoutes.VERIFY_OTP}?email=${data.email}`);
      toast.success(t("auth.checkYourEmail"));
    },
    onError: (err) => responseErrorHandler(err),
  });

  return { isLoading, forgetPassword };
};

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: verifyOtp } = useMutation({
    mutationFn: authServices.verifyOtp,
    onSuccess: (_, data) => {
      navigate(`${authRoutes.NEW_PASSWORD}?email=${data.email}&otp=${data.otp}`);
      toast.success(t("auth.otpVerified"));
    },
    onError: (err) => responseErrorHandler(err),
  });

  return { isLoading, verifyOtp };
};

export const useNewPassword = () => {
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: newPassword } = useMutation({
    mutationFn: authServices.newPassword,
    onSuccess: () => {
      navigate(authRoutes.LOGIN);
      toast.success(t("auth.passwordUpdated"));
    },
    onError: (err) => responseErrorHandler(err),
  });

  return { isLoading, newPassword };
};

export const useCreatePasswordAfterLogin = () => {
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: createPassword } = useMutation({
    mutationFn: authServices.createPasswordAfterLogin,
    onSuccess: () => {
      navigate(authRoutes.HOME);
      toast.success(t("auth.passwordUpdated"));
    },
    onError: (err) => responseErrorHandler(err),
  });

  return { isLoading, createPassword };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const logout = () => {
    clearAuth();
    navigate(authRoutes.LOGIN);
  };

  return { logout };
};
