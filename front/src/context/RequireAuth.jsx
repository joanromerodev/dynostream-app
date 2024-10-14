import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const { auth } = useAuth();
  if (!auth) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default RequireAuth;
