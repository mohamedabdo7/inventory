import { Navigate, Outlet } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
// import AuthSkeleton from "./components/common/AuthSkeleton";

interface RouteConfig {
  permission?: string;
  scope?: string;
}

interface ProtectedRouteProps {
  config: RouteConfig;
}

const ProtectedRoute = ({ config }: ProtectedRouteProps) => {
  const { hasPermission, isScopeAllowed, admin } = useAuthStore();
  // const { isLoading } = useQuery({ queryKey: ["auth"] });

  // if (isLoading) {
  //   return <AuthSkeleton />;
  // }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess =
    !config.permission ||
    hasPermission(config.permission) ||
    (config.scope && isScopeAllowed(config.scope));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
