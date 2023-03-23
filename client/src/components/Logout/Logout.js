import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { logout } from "../../services/authService";

export default function Logout() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function onLogout() {
            try {
                await logout(user.accessToken);
                setUser(null);
                sessionStorage.clear();
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }

        if (user) {
            onLogout();
        } else {
            navigate("/");
        }
    }, [user, navigate, setUser]);

    return <Navigate to="/" />;
}