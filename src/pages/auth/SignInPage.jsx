import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/slices/authSlice";
import AnimatedButton from "@/components/ui/AnimatedButton";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import nasibLogo from "../../assets/Nasib.png";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        toast.success("Login successful!", { duration: 3000 });
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        dispatch(setLogin({
          user: res.data.user,
          token: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        }));

        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#141b2d]">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#141b2d]">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Login to your account
            </h1>
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-[#ffae2c] hover:underline">
                Register
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Username/Email Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">
                  Username or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0B121D] border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] transition-all"
                    placeholder="Username or Email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#0B121D] border border-gray-700 rounded-lg py-3 pl-4 pr-10 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] transition-all"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/auth/forgotpass"
                className="text-sm text-gray-400 hover:text-[#ffae2c] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Play Now Button */}
            <AnimatedButton
              text={isLoading ? "Logging in..." : "Play Now"}
              disabled={isLoading}
              className="w-full py-3 text-base font-bold text-[#0e1624]"
              fillColor1="#ffae2c"
              fillColor2="#ff9500"
            />
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#141b2d] px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login (Google) */}
          <div className="flex justify-center">
            <button className="flex items-center gap-2 bg-[#1f2937] hover:bg-[#374151] text-white px-6 py-2.5 rounded-lg transition-colors border border-gray-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Logo Panel */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[#0B121D]">
        <img
          src={nasibLogo}
          alt="Nasiib"
          className="w-80 object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default SignInPage;
