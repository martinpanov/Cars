import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../../api/users";
import { UserContext } from "../../contexts/UserContext";

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { logout } = useLogoutMutation();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    logout().then(() => {
      setUser(null);
      sessionStorage.clear();
      navigate("/");
    });
  }, [user, navigate, setUser, logout]);

  return <Navigate to="/" />;
};
