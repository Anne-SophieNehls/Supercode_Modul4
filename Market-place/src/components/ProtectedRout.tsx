import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "./userContext";

export default function ProtectedRout() {
  const { user } = useUserContext();
  const location = useLocation();

  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
}
