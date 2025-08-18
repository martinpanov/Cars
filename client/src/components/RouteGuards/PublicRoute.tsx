import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

export const PublicRoute: React.FC = () => {
  const { user } = useContext(UserContext);

  if (user) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};
