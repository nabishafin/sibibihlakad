import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import AnimatedButton from "@/components/ui/AnimatedButton";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import nasibLogo from "../../assets/Nasib.png";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        }
    };

    return (
        <div className="flex min-h-screen bg-[#141b2d]">
            {/* Left Side - Registration Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-[#141b2d]">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white">
                            Create your account
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <Link to="/auth/signin" className="text-[#ffae2c] hover:underline">
                                Login
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
                            {/* Username Input */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-300">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-[#0B121D] border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] transition-all"
                                    placeholder="Username"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-300">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#0B121D] border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>

                            {/* Password Inputs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-300">
                                        Confirm
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full bg-[#0B121D] border border-gray-700 rounded-lg py-3 pl-4 pr-10 text-white placeholder-gray-500 outline-none focus:border-[#ffae2c] transition-all"
                                            placeholder="Confirm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
                                        >
                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
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
                                className="h-4 w-4 rounded border-gray-700 bg-[#0B121D] text-[#ffae2c] focus:ring-[#ffae2c] cursor-pointer"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400 cursor-pointer">
                                I agree to the{" "}
                                <a href="#" className="text-[#ffae2c] hover:underline">
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>

                        {/* Register Button */}
                        <AnimatedButton
                            text={isLoading ? "Creating Account..." : "Register"}
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

export default RegisterPage;
