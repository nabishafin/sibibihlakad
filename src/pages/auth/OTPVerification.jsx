import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import nasibLogo from "../../assets/Nasib.png";
import AnimatedButton from "@/components/ui/AnimatedButton";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth/reset-password");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#141b2d]">
      {/* Left Side - OTP Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#141b2d]">
        <div className="w-full max-w-md space-y-8">

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">OTP Verification</h1>
            <p className="text-sm text-gray-400">
              Enter the verification code sent to your email
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">
                OTP Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-[#0B121D] border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] transition-all tracking-widest text-center text-lg"
                  placeholder="------"
                  maxLength={6}
                />
              </div>
            </div>

            <AnimatedButton
              text={isLoading ? "Verifying..." : "Verify OTP"}
              disabled={isLoading}
              className="w-full py-3 text-base font-bold text-[#0e1624]"
              fillColor1="#ffae2c"
              fillColor2="#ff9500"
            />

            <div className="flex flex-col items-center gap-3 pt-2">
              <p className="text-sm text-gray-400">
                Didn't receive the OTP?{" "}
                <button type="button" className="text-[#ffae2c] hover:underline">
                  Resend OTP
                </button>
              </p>

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

export default OTPVerification;
