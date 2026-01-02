import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/slices/authSlice";
import AnimatedButton from "@/components/ui/AnimatedButton";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        usernameOrEmail: formData.email,
        password: formData.password,
      }).unwrap();

      if (res.success) {
        toast.success("Login successful!", { duration: 3000 });
        // Save to LocalStorage
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        // Update Redux
        dispatch(setLogin({
          user: res.data.user,
          token: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        }));

        // Redirect
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      // Middleware handles toast error.
      // We still set local error state for UI feedback if needed, or rely solely on toast.
      setError(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#1a2332] to-[#0a0a0a]">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ffae2c] to-[#ffda8b] bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-400 mb-1 pl-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ffae2c]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0e1624] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] focus:ring-1 focus:ring-[#ffae2c] transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-400 mb-1 pl-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ffae2c]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#0e1624] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] focus:ring-1 focus:ring-[#ffae2c] transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/auth/forgotpass"
                className="text-sm text-[#ffae2c] hover:text-[#ffda8b] transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Sign In Button */}
            <AnimatedButton
              text={isLoading ? "Signing in..." : "Sign in"}
              disabled={isLoading}
              className="w-full py-3.5 text-lg font-bold shadow-lg shadow-[#ffae2c]/20"
              fillColor1="#ffae2c"
              fillColor2="#ff9500"
            />
          </form>

          {/* Register Link */}
          <div className="text-center pt-4">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-[#ffae2c] font-semibold hover:text-[#ffda8b] transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Decoration */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#0e1624]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffae2c]/10 to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="w-24 h-24 bg-[#ffae2c] rounded-2xl rotate-45 flex items-center justify-center mb-8 shadow-2xl shadow-[#ffae2c]/30">
            <div className="w-20 h-20 bg-[#0e1624] rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#ffae2c] -rotate-45" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.504-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white max-w-md">
            Your Gateway to Premium Gaming
          </h2>
          <p className="text-gray-400 max-w-sm">
            Access your dashboard, manage your assets, and experience the thrill of our exclusive games.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
