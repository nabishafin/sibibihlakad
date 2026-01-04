import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import nasibLogo from "../../assets/Nasib.png";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useRecoverPasswordMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await recoverPassword({ email }).unwrap();
      if (res.success) {
        toast.success(res.message || "Recovery email sent!");
        // Navigate to Reset Password page
        navigate("/auth/reset-password");
      }
    } catch (err) {
      console.error("Recovery failed:", err);
      toast.error(err?.data?.message || "Failed to send recovery email");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#141b2d]">
      {/* Left Side - Recovery Form */}
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
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B121D] border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Send Recovery Email Button */}
            <AnimatedButton
              text={isLoading ? "Sending..." : "Send Recovery Email"}
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
                Back to Login
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

export default ForgotPassword;
