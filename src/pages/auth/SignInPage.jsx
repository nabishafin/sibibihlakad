import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import nasibLogo from "../../assets/Nasib.png";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/slices/authSlice";
import { Loader2 } from "lucide-react";

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
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        usernameOrEmail: formData.email,
        password: formData.password,
      }).unwrap();

      if (res.success) {
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
      setError(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#1a2332] to-[#0a0a0a]">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Login to your account</h1>
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-[#DAA520] hover:underline">
                Register
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Username/Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Username or Email
              </Label>
              <Input
                id="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                placeholder="Username or Email"
                className="bg-[#0e1624] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#DAA520] h-12"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-[#0e1624] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#DAA520] h-12"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-start">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-gray-400 hover:text-[#DAA520] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Play Now Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#DAA520] hover:bg-[#d6b25e] text-[#0e1624] font-semibold h-12 text-base disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Play Now"
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-gray-700"></div>
              <span className="text-xs uppercase text-gray-500 font-medium">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-gray-700"></div>
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent border-gray-700 text-white hover:bg-[#0e1624] h-12"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Logo */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-transparent">
        <div className="text-center">
          <img src={nasibLogo} alt="Nasiib Logo" className="w-96 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
