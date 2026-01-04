import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import nasibLogo from "../../assets/Nasib.png";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    code: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const res = await resetPassword({
        recoveryCode: formData.code,
        newPassword: formData.newPassword
      }).unwrap();

      if (res.success) {
        toast.success(res.message || "Password reset successfully!");
        navigate("/auth/signin");
      }
    } catch (err) {
      console.error("Reset password failed:", err);
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#141b2d]">
      {/* Left Side - Reset Password Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#141b2d]">
        <div className="w-full max-w-md space-y-8">

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Recover Account</h1>
            <p className="text-sm text-gray-400">
              Enter your email and we will send you a recovery code
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Recovery Code Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">
                  Recovery Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="code"
                    required
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full bg-[#0B121D] border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] transition-all"
                    placeholder="Recovery Code"
                  />
                </div>
              </div>

              {/* New Password Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    required
                    value={formData.newPassword}
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

              {/* Confirm Password Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#0B121D] border border-gray-700 rounded-lg py-3 pl-4 pr-10 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] transition-all"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Set New Password Button */}
            <AnimatedButton
              text={isLoading ? "Updating..." : "Set New Password"}
              disabled={isLoading}
              className="w-full py-3 text-base font-bold text-[#0e1624]"
              fillColor1="#ffae2c"
              fillColor2="#ff9500"
            />

            {/* Back to Login Link */}
            <div className="flex items-center justify-center pt-2">
              <Link
                to="/auth/signin"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#ffae2c] transition-colors"
              >
                <ChevronLeft size={16} />
                Back To Login
              </Link>
            </div>
          </form>
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

export default ResetPassword;

