import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deliveryApi = createApi({
  reducerPath: "delivery",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllDelivery: builder.query({
      query: (user_id) => `/users/${user_id}/delivery`,
      providesTags: ["deliveryList"],
    }),

    getDelivery: builder.query({
      query: (user_id, delivery_id) =>
        `/users/${user_id}/delivery/${delivery_id}`,
    }),

    createDelivery: builder.mutation({
      query: (user_id, data) => ({
        url: `/users/${user_id}/delivery`,
        body: data,
        method: "post",
      }),
      invalidatesTags: ["deliveryList"],
    }),

    updateDelivery: builder.mutation({
      query: (user_id, delivery_id, data) => ({
        url: `/users/${user_id}/delivery/${delivery_id}`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["deliveryList"],
    }),

    deleteDelivery: builder.mutation({
      query: (user_id, delivery_id) => ({
        url: `/users/${user_id}/delivery/${delivery_id}`,
        method: "delete",
      }),
      invalidatesTags: ["deliveryList"],
    }),
  }),
});

export const {
  useGetAllDeliveryQuery,
  useGetDeliveryQuery,
  useCreateDeliveryMutation,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
} = deliveryApi;
