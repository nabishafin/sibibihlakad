import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";

export function AccountSettingsModal({ open, onOpenChange }) {
    const { user } = useSelector((state) => state.auth);
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const email = user?.email || "User123@gmail.com";

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitPasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        try {
            await changePassword({
                newPassword: passwordData.newPassword,
            }).unwrap();

            toast.success("Password changed successfully!");
            setPasswordData({ newPassword: "", confirmPassword: "" });
            onOpenChange(false);
        } catch (error) {
            console.error("Password change failed:", error);
            toast.error(error?.data?.message || "Failed to change password");
        }
    };

    const handleAccountClosure = () => {
        // This would typically trigger a confirmation dialog
        toast.error("Account closure requires additional verification");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0B121D] border-gray-800 text-white max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white font-semibold">
                        Account Setting
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-[#1a2536] border border-gray-700">
                        <TabsTrigger
                            value="general"
                            className="data-[state=active]:bg-[#DAA520] data-[state=active]:text-black text-gray-300"
                        >
                            Account Setting
                            <span className="block text-xs text-gray-400 data-[state=active]:text-black/70">
                                General
                            </span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="data-[state=active]:bg-[#DAA520] data-[state=active]:text-black text-gray-300"
                        >
                            Security
                            <span className="block text-xs text-gray-400 data-[state=active]:text-black/70">
                                Change Password
                            </span>
                        </TabsTrigger>
                    </TabsList>

                    {/* General Tab */}
                    <TabsContent value="general" className="space-y-6 mt-6">
                        <form onSubmit={handleSubmitPasswordChange} className="space-y-4">
                            {/* Email Address */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm text-gray-300">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    disabled
                                    className="bg-[#1a2536] border-gray-700 text-white disabled:opacity-70"
                                />
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-sm text-gray-300">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        name="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Password"
                                        className="bg-[#1a2536] border-gray-700 text-white pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="confirmPassword"
                                    className="text-sm text-gray-300"
                                >
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm Password"
                                        className="bg-[#1a2536] border-gray-700 text-white pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Change Password Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-black font-semibold"
                            >
                                {isLoading ? "Changing..." : "Change Password"}
                            </Button>
                        </form>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6 mt-6">
                        {/* Account Closure Section */}
                        <div className="bg-[#1a2536] rounded-lg p-6 border border-gray-700">
                            <h3 className="text-sm font-semibold text-white mb-2">
                                Account Closure
                            </h3>
                            <p className="text-sm text-gray-300 mb-4">
                                You may close your account by clicking the "Close My Account"
                                button below. All of your data will be permanently wiped and
                                cannot be restored in the future
                            </p>
                            <div className="flex items-center justify-between">
                                <Button
                                    type="button"
                                    onClick={handleAccountClosure}
                                    className="bg-teal-600 hover:bg-teal-700 text-white"
                                >
                                    Close My Account
                                </Button>
                                <span className="text-xs text-pink-500 font-semibold px-3 py-1 bg-pink-500/10 rounded">
                                    Shivani Kumar Patel
                                </span>
                            </div>
                        </div>

                        {/* Additional Security Info */}
                        <div className="text-xs text-gray-400 text-center">
                            <p>For security reasons, account closure requires verification.</p>
                            <p className="mt-1">
                                Go to settings → <span className="text-[#DAA520]">Activate</span>
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
