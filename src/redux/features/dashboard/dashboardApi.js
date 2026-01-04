import { baseApi } from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLiveStats: builder.query({
            query: () => "/dashboard/live-stats",
            // Optional: You might want to poll this or invalidate on certain actions, 
            // but for now simple fetching is fine.
        }),
    }),
});

export const { useGetLiveStatsQuery } = dashboardApi;
