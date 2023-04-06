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

        onLogout();

    }, [user, navigate, setUser]);

    return <Navigate to="/" />;
}