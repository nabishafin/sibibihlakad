import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import nasibLogo from "../../assets/Nasib.png";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.id]: value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!formData.terms) {
            setError("Please accept the terms and conditions");
            return;
        }

        try {
            const res = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }).unwrap();

            if (res.success) {
                navigate("/auth/signin");
            }
        } catch (err) {
            console.error("Register failed:", err);
            setError(err?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-[#1a2332] to-[#0a0a0a]">
            {/* Left Side - Registration Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">

                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white">Create your account</h1>
                        <p className="text-sm text-gray-400">
                            Already have an account?{" "}
                            <Link to="/auth/signin" className="text-[#ffae2c] hover:underline">
                                Login
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
                            <Label htmlFor="username" className="text-gray-300">
                                Username
                            </Label>
                            <Input
                                id="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Choose a username"
                                className="bg-[#0e1624] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ffae2c] h-12"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="bg-[#0e1624] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ffae2c] h-12"
                                required
                            />
                        </div>

                        {/* Password Fields */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-300">
                                New Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="bg-[#0e1624] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ffae2c] h-12"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-300">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className="bg-[#0e1624] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#ffae2c] h-12"
                                required
                            />
                        </div>

                        {/* Password Requirements */}
                        <p className="text-xs text-gray-500">
                            Password must be at least 7 characters
                        </p>

                        {/* Terms and Conditions Checkbox */}
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 rounded border-gray-700 bg-[#0e1624] text-[#ffae2c] focus:ring-[#ffae2c]"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-gray-400">
                                I am 18+ and have read and accept the{" "}
                                <Link to="#" className="text-[#ffae2c] hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link to="#" className="text-[#ffae2c] hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        {/* Play Now Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#ffae2c] hover:bg-[#d6b25e] text-[#0e1624] font-semibold h-12 text-base disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Account...
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

                        {/* Google Sign Up */}
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

export default RegisterPage;
