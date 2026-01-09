import React from "react";

export function Loading({ size = "default", text = "Loading..." }) {
    const sizeClasses = {
        small: "w-8 h-8",
        default: "w-16 h-16",
        large: "w-24 h-24",
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            {/* Animated Bitcoin Logo Spinner */}
            <div className="relative">
                {/* Outer rotating ring */}
                <div
                    className={`${sizeClasses[size]} rounded-full border-4 border-gray-700 border-t-[#DAA520] animate-spin`}
                ></div>

                {/* Inner pulsing circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`${size === "small" ? "w-4 h-4" : size === "large" ? "w-12 h-12" : "w-8 h-8"} rounded-full bg-[#DAA520] animate-pulse`}></div>
                </div>
            </div>

            {/* Loading text */}
            {text && (
                <p className="mt-4 text-gray-400 text-sm animate-pulse">{text}</p>
            )}
        </div>
    );
}

// Table row loading variant
export function TableLoading({ columns = 5, text = "Loading..." }) {
    return (
        <tr>
            <td colSpan={columns} className="text-center py-8">
                <Loading size="default" text={text} />
            </td>
        </tr>
    );
}

// Full page loading variant
export function PageLoading({ text = "Loading..." }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0e1624]">
            <Loading size="large" text={text} />
        </div>
    );
}
