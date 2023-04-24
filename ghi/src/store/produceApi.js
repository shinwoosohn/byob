import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const produceApi = createApi({
  reducerPath: "produce",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllProduce: builder.query({
      query: (user_id) => `/users/${user_id}/produce`,
      providesTags: ["produceList"],
    }),
    getProduce: builder.query({
      query: (user_id, produce_id) => `/users/${user_id}/produce/${produce_id}`,
    }),
    createProduce: builder.mutation({
      query: (user_id, data) => ({
        url: `/users/${user_id}/produce`,
        body: data,
        method: "post",
      }),
      invalidatesTag: ["produceList"],
    }),
    updateProduce: builder.mutation({
      query: (user_id, produce_id, data) => ({
        url: `/users/${user_id}/produce/${produce_id}`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["produceList"],
    }),
    deleteProduce: builder.mutation({
      query: (user_id, produce_id) => ({
        url: `/users/${user_id}/produce/${produce_id}`,
        method: "delete",
      }),
      invalidatesTags: ["produceList"],
    }),
  }),
});

export const {
  useGetProduceQuery,
  useCreateProduceMutation,
  useGetAllProduceQuery,
  useDeleteProduceMutation,
  useUpdateProduceMutation,
} = produceApi;
