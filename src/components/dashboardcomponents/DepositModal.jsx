import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useDepositFundsMutation } from "@/redux/features/wallet/walletApi";

export function DepositModal({ open, onOpenChange }) {
    const [amount, setAmount] = useState("");
    const [depositFunds, { isLoading }] = useDepositFundsMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const depositAmount = parseFloat(amount);

        console.log("💰 Deposit Debug:");
        console.log("Amount entered:", amount);
        console.log("Parsed amount:", depositAmount);

        if (!depositAmount || depositAmount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        try {
            console.log("Calling deposit API with:", { amount });
            const response = await depositFunds({
                amount: amount,
            }).unwrap();

            console.log("Deposit response received:", response);

            if (response.success || response.code === 200) {
                toast.success(response.message || "Deposit successful!");
                setAmount("");
                onOpenChange(false);
            } else {
                console.error("Deposit reports failure:", response);
                toast.error(response.message || "Deposit failed. Please try again.");
            }
        } catch (error) {
            console.error("Deposit catch error:", error);
            const errorMessage = error?.data?.message || error?.message || "Deposit failed. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0B121D] border-gray-800 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white font-semibold">
                        Deposit Funds
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {/* Amount Input */}
                    <div className="space-y-2">
                        <Label htmlFor="amount" className="text-sm text-gray-300">
                            Amount (BTC)
                        </Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.00000001"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.01"
                            className="bg-[#1a2536] border-gray-700 text-white"
                            required
                        />
                        <p className="text-xs text-gray-400">
                            Enter the amount of BTC you want to deposit
                        </p>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="space-y-2">
                        <Label className="text-sm text-gray-300">Quick Amount</Label>
                        <div className="grid grid-cols-4 gap-2">
                            {["0.001", "0.005", "0.01", "0.05"].map((quickAmount) => (
                                <button
                                    key={quickAmount}
                                    type="button"
                                    onClick={() => setAmount(quickAmount)}
                                    className="px-3 py-2 bg-[#1a2536] hover:bg-[#2a3546] border border-gray-700 rounded-lg text-sm text-white transition-colors"
                                >
                                    {quickAmount}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-[#1a2536] hover:text-white"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-[#DAA520] hover:bg-[#B8860B] text-black font-semibold"
                        >
                            {isLoading ? "Processing..." : "Deposit"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
