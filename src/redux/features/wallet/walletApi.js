import { baseApi } from "../../api/baseApi";

export const walletApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Deposit funds
        depositFunds: builder.mutation({
            query: (data) => ({
                url: "/wallet/deposit",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"], // Invalidate to refetch user data with new balance
        }),

        // Get wallet balance (if needed separately)
        getWalletBalance: builder.query({
            query: () => ({
                url: "/wallet/balance",
                method: "GET",
            }),
            providesTags: ["auth"],
        }),

        // Get general transactions
        getTransactions: builder.query({
            query: ({ page = 1, limit = 10 } = {}) => ({
                url: `/history/transactions?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["auth"],
        }),
    }),
});

export const { useDepositFundsMutation, useGetWalletBalanceQuery, useGetTransactionsQuery } = walletApi;
