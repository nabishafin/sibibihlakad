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
                url: "/games/spin-wheel/result",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),

        // Get Spin Wheel Stats
        getSpinWheelStats: builder.query({
            query: () => "/games/spin-wheel/stats",
        }),

        // Get Spin Wheel History
        getSpinWheelHistory: builder.query({
            query: () => "/history/transactions?game=Spin Wheel",
            providesTags: ["auth"], // Re-fetch when auth invalidates (e.g. after a game)
        }),

        // Get Scratch Card Stats
        getScratchCardStats: builder.query({
            query: () => "/games/scratch-card/stats",
        }),

        // Get Scratch Card History
        getScratchCardHistory: builder.query({
            query: () => "/history/transactions?game=Scratch Card",
            providesTags: ["auth"],
        }),
    }),
});

export const {
    useSubmitScratchResultMutation,
    useSubmitSpinWheelResultMutation,
    useGetSpinWheelStatsQuery,
    useGetSpinWheelHistoryQuery,
    useGetScratchCardStatsQuery,
    useGetScratchCardHistoryQuery
} = gameApi;
