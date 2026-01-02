import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import AnimatedButton from "@/components/ui/AnimatedButton";
import toast from "react-hot-toast";

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
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            return;
        }
        if (!formData.terms) {
            setError("Please accept the terms and conditions");
            toast.error("Please accept the terms and conditions");
            return;
        }

        try {
            const res = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }).unwrap();

            if (res.success) {
                toast.success("Registration successful! Please login.");
                navigate("/auth/signin");
            }
        } catch (err) {
            console.error("Register failed:", err);
            setError(err?.data?.message || "Registration failed. Please try again.");
            // Middleware handles toast error for API calls
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-[#1a2332] to-[#0a0a0a]">
            {/* Left Side - Registration Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                    {/* Logo & Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ffae2c] to-[#ffda8b] bg-clip-text text-transparent">
                            Create Account
                        </h1>
                        <p className="text-gray-400">Join our premium gaming community</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Username Input */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-400 mb-1 pl-1">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ffae2c]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full bg-[#0e1624] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] focus:ring-1 focus:ring-[#ffae2c] transition-all"
                                        placeholder="johndoe"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-400 mb-1 pl-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ffae2c]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
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

                            {/* Password Inputs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-400 mb-1 pl-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ffae2c]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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

                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-400 mb-1 pl-1">
                                        Conf. Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ffae2c]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full bg-[#0e1624] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] focus:ring-1 focus:ring-[#ffae2c] transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={formData.terms}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-700 bg-[#0e1624] text-[#ffae2c] focus:ring-[#ffae2c]"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                                I agree to the{" "}
                                <a href="#" className="text-[#ffae2c] hover:underline">
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>

                        {/* Register Button */}
                        <AnimatedButton
                            text={isLoading ? "Creating Account..." : "Create Account"}
                            disabled={isLoading}
                            className="w-full py-3.5 text-lg font-bold shadow-lg shadow-[#ffae2c]/20"
                            fillColor1="#ffae2c"
                            fillColor2="#ff9500"
                        />
                    </form>

                    {/* Sign In Link */}
                    <div className="text-center pt-2">
                        <p className="text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/auth/signin"
                                className="text-[#ffae2c] font-semibold hover:text-[#ffda8b] transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Decoration */}
            <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#0e1624]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-[#ffae2c]/10 to-transparent"></div>

                <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center space-y-6">
                    <div className="w-24 h-24 bg-[#ffae2c] rounded-2xl -rotate-12 flex items-center justify-center mb-8 shadow-2xl shadow-[#ffae2c]/30">
                        <div className="w-20 h-20 bg-[#0e1624] rounded-xl flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#ffae2c] rotate-12" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white max-w-md">
                        Join the Winning Team
                    </h2>
                    <p className="text-gray-400 max-w-sm">
                        Unlock exclusive rewards, participate in tournaments, and connect with other gamers.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
