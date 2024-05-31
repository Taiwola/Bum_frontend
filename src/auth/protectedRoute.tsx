import { verifyUser } from "@/api/auth/route";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {

  const { isLoading, data, isError } = useQuery("verifyUser", verifyUser, {
    retry: false
  });

  if (isLoading) {
    return null
  }

  if (isError) {
    return <Navigate to="/sign-in" replace={true} />;
  }

  if (data != null) {
    return <Outlet />
  }

  return <Navigate to="/" replace />;
}