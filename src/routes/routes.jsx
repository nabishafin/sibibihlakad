import { createBrowserRouter } from "react-router-dom";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Auth Pages
import SignInPage from "../pages/auth/SignInPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OTPVerification from "../pages/auth/OTPVerification";
import ResetPassword from "../pages/auth/ResetPassword";

// Dashboard Pages
import Home from "../pages/dashboardpages/home/Home";
import Games, { SpinGames } from "../pages/dashboardpages/games/SpinGames";

import Wallet from "../pages/dashboardpages/wallet/Wallet";
import History from "../pages/dashboardpages/history/History";
import Language from "../pages/dashboardpages/language/Language";
import { ScratchCard } from "@/pages/dashboardpages/games/scratch-card/ScratchCard";
import SpinWheel from "@/components/dashboardcomponents/Games.jsx/SpinWheel";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/forgotpass",
    element: <ForgotPassword />,
  },
  {
    path: "/otpverification",
    element: <OTPVerification />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "games", element: <Games /> },
      { path: "games/spin-wheel", element: <SpinGames /> },
      { path: "games/scratch-card", element: <ScratchCard /> },
      { path: "wallet", element: <Wallet /> },
      { path: "history", element: <History /> },
      { path: "language", element: <Language /> },
    ],
  },
]);

export default routes;
