import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["auth"],
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/users/update-profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const { useGetMeQuery, useUpdateProfileMutation } = userApi;
