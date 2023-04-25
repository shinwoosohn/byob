import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const requestsApi = createApi({
  reducerPath: "requests",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllRequests: builder.query({
      query: (user_id) => `/users/${user_id}/deliveries`,
      providesTags: ["requestsList"],
    }),

    getRequest: builder.query({
      query: ({ user_id, delivery_id }) =>
        `/users/${user_id}/deliveries/${delivery_id}`,
    }),

    createRequest: builder.mutation({
      query: (data) => ({
        url: `/deliveries`,
        body: data,
        method: "post",
      }),
      invalidatesTags: ["requestsList"],
    }),

    updateRequest: builder.mutation({
      query: ({ user_id, delivery_id, data }) => ({
        url: `/users/${user_id}/deliveries/${delivery_id}`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["requestsList"],
    }),

    deleteRequest: builder.mutation({
      query: ({ user_id, delivery_id }) => ({
        url: `/users/${user_id}/deliveries/${delivery_id}`,
        method: "delete",
      }),
      invalidatesTags: ["requestsList"],
    }),
  }),
});

export const {
  useGetAllRequestsQuery,
  useGetRequestQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
} = requestsApi;
