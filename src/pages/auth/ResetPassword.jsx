import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import nasibLogo from "../../assets/Nasib.png";

const ResetPassword = () => {
  return (
    <div className="flex h-screen bg-[#1a2332]">
      {/* Left Side - Reset Password Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Recover Account</h1>
            <p className="text-sm text-gray-400">
              Enter your email and we will send you a recovery code
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Recovery Code Field */}
            <div className="space-y-2">
              <Label htmlFor="code" className="text-gray-300">
                Recovery Code
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="Recovery Code"
                className="bg-[#0e1624] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ffae2c] h-12"
                required
              />
            </div>

            {/* New Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="bg-[#0e1624] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ffae2c] h-12"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="bg-[#0e1624] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ffae2c] h-12"
                required
              />
            </div>

            {/* Set New Password Button */}
            <Button
              type="submit"
              className="w-full bg-[#ffae2c] hover:bg-[#d6b25e] text-[#0e1624] font-semibold h-12 text-base"
            >
              Set New Password
            </Button>

            {/* Back to Login Link */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <ChevronLeft size={16} className="text-gray-400" />
              <Link
                to="/signin"
                className="text-sm text-gray-400 hover:text-[#ffae2c] transition-colors"
              >
                Back To Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Logo */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[#0e1624]">
        <div className="text-center">
          <img src={nasibLogo} alt="Nasiib Logo" className="w-96 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;