import { baseApi } from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLiveStats: builder.query({
            query: () => "/dashboard/live-stats",
        }),
        getDashboardData: builder.query({
            query: (userId) => `/dashboard?userId=${userId}`,
        }),
        getAllActivity: builder.query({
            query: ({ page = 1, limit = 10 }) => `/activity?page=${page}&limit=${limit}`,
        }),
    }),
});

export const { useGetLiveStatsQuery, useGetDashboardDataQuery, useGetAllActivityQuery } = dashboardApi;
