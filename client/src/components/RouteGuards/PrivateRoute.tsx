import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

export const PrivateRoute: React.FC = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};
