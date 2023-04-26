import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pickupsApi = createApi({
  reducerPath: "pickups",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllDriverDeliveries: builder.query({
      query: (driver_id) => `/drivers/${driver_id}/deliveries`,
      providesTags: ["pickupsList"],
    }),

    completeDriverDelivery: builder.mutation({
      query: ({ driver_id, delivery_id, data }) => ({
        url: `/drivers/${driver_id}/deliveries/${delivery_id}/complete`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["pickupsList"],
    }),

    removeDriverDelivery: builder.mutation({
      query: ({ driver_id, delivery_id, data }) => ({
        url: `/drivers/${driver_id}/deliveries/${delivery_id}/remove`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["pickupsList"],
    }),
  }),
});

export const {
  useGetAllDriverDeliveriesQuery,
  useCompleteDriverDeliveryMutation,
  useRemoveDriverDeliveryMutation,
} = pickupsApi;
