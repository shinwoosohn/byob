import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUserOrders: builder.query({
      query: (producer_id) => `/users/${producer_id}/orders`,
      providesTags: ["ordersList"],
    }),

    getUserOrder: builder.query({
      query: ({ producer_id, delivery_id }) =>
        `/users/${producer_id}/orders/${delivery_id}`,
    }),
    completeUserOrder: builder.mutation({
      query: ({ producer_id, delivery_id, data }) => ({
        url: `/users/${producer_id}/orders/${delivery_id}`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["ordersList"],
    }),
  }),
});

export const {
  useGetAllUserOrdersQuery,
  useGetUserOrderQuery,
  useCompleteUserOrderMutation,
} = ordersApi;
