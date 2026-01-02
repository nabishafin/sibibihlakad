import { baseApi } from "../../api/baseApi";

export const gameApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Scratch Card Result
        submitScratchResult: builder.mutation({
            query: (data) => ({
                url: "/games/scratch/result",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"], // Invalidate auth to refetch balance/user data
        }),

        // Spin Wheel Result
        submitSpinWheelResult: builder.mutation({
            query: (data) => ({
                url: "/games/spin/result",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const { useSubmitScratchResultMutation, useSubmitSpinWheelResultMutation } = gameApi;
