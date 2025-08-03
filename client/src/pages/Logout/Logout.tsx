import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

import { useLogoutQuery } from "../../api/users";

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { logout } = useLogoutQuery();

  useEffect(() => {
    logout(user.accessToken)
      .then(() => {
        setUser(null);
        sessionStorage.clear();
        navigate("/");
      });
  }, [user, navigate, setUser]);

  return <Navigate to="/" />;
};