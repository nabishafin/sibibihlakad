import { isRejectedWithValue } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    // RTK Query uses `isRejectedWithValue` middleware for handled errors
    if (isRejectedWithValue(action)) {
        // Check if it's an API rejection
        // action.payload contains the error details
        if (action.payload) {
            // Prefer explicit 'message' from backend, else fallbacks
            const errMsg =
                action.payload.data?.message ||
                action.payload.message ||
                action.payload.error ||
                "An unexpected error occurred";

            toast.error(errMsg);
        } else {
            toast.error("An unknown error occurred");
        }
    }

    return next(action);
};
