import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserByTokenQuery } from "@/redux/features/auth/authApi";
import { setLogin, logout } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
    const { token } = useSelector((state) => state.auth);
    const localToken = localStorage.getItem("token");
    const dispatch = useDispatch();

    // If we have a local token but no redux state, verify it
    const { data, isLoading, error } = useGetUserByTokenQuery(undefined, {
        skip: !!token || !localToken, // Skip if already logged in or no token to verify (handled by next check)
    });

    useEffect(() => {
        if (data?.success && data?.data) {
            // Restore session
            dispatch(setLogin({
                user: data.data,
                token: localToken,
                refreshToken: localStorage.getItem("refreshToken"),
            }));
        } else if (error) {
            // Token invalid
            dispatch(logout());
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        }
    }, [data, error, dispatch, localToken]);

    // Loading state while verifying
    if (isLoading && localToken && !token) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#020817]">
                <Loader2 className="h-8 w-8 animate-spin text-[#ffae2c]" />
            </div>
        );
    }

    // If after checks we still don't have a token (and verification didn't succeed or wasn't tried)
    // We check 'token' (redux) because if data came back success, useEffect sets it.
    // But useEffect runs after render.
    // The logic is:
    // 1. Initial render: token=null, localToken=exists. isLoading=true. Show Loader.
    // 2. Query finishes. Success.
    // 3. Effect runs. Dispatch setLogin.
    // 4. Re-render. token=exists. isLoading=false. Show Outlet.

    // What if verification failed?
    // 1. Query finishes. Error.
    // 2. Effect runs. Dispatch logout. Clears localToken.
    // 3. Re-render. token=null, localToken=null. Check below triggers.

    if (!token && !localToken) {
        return <Navigate to="/auth/signin" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
