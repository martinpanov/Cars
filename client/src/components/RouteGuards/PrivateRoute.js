import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const [user] = useContext(UserContext);

    if (!user) {
        return <Navigate to={'/login'} />;
    }

    return <Outlet />;
}