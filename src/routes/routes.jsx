import { createBrowserRouter } from "react-router-dom";

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// Auth Pages
import SignInPage from "@/pages/auth/SignInPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import OTPVerification from "@/pages/auth/OTPVerification";
import ResetPassword from "@/pages/auth/ResetPassword";

// Dashboard Pages
import Home from "../pages/dashboardpages/home/Home";

import Wallet from "../pages/dashboardpages/wallet/Wallet";
import History from "../pages/dashboardpages/history/History";
import Language from "../pages/dashboardpages/language/Language";

import { ScratchCard } from "@/pages/dashboardpages/games/scratch-card/ScratchCard";
import SpinWheelPage from "@/pages/dashboardpages/games/spin-wheel/SpinWheelPage";
import AllActivity from "@/pages/dashboardpages/activity/AllActivity";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/auth/signin",
    element: <SignInPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/forgotpass",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/otp",
    element: <OTPVerification />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "games/spin-wheel", element: <SpinWheelPage /> },
          { path: "games/scratch-card", element: <ScratchCard /> },
          { path: "wallet", element: <Wallet /> },
          { path: "history", element: <History /> },
          { path: "activity", element: <AllActivity /> },
          { path: "language", element: <Language /> },
        ],
      },
    ],
  },
]);

export default routes;
