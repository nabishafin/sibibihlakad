import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const { token } = useSelector((state) => state.auth);
    const localToken = localStorage.getItem("token");

    // Since the verify endpoint is not ready, we trust the local token presence
    // On reload, Redux token might be null, but localToken exists.
    // We can't fetch user data yet, so we proceed with just the token check.

    if (!token && !localToken) {
        return <Navigate to="/auth/signin" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
