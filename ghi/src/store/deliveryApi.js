import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deliveryApi = createApi({
  reducerPath: "deliveries",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllDeliveries: builder.query({
      query: () => `/deliveries`,
      providesTags: ["deliveryList"],
    }),

    getDelivery: builder.query({
      query: (delivery_id) => `/deliveries/${delivery_id}`,
    }),

    acceptDelivery: builder.mutation({
      query: ({ delivery_id, data }) => ({
        url: `/deliveries/${delivery_id}/accept`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["deliveryList"],
    }),
  }),
});

export const {
  useGetAllDeliveryQuery,
  useGetDeliveryQuery,
  useAcceptDeliveryMutation,
} = deliveryApi;
