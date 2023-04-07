import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const produceApi = createApi({
  reducerPath: "produce",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
  }),
  endpoints: (builder) => ({
    // getAllProduce: builder.query({
    //   query: () => "/produce",
    //   providesTags: ["produceList"],
    // }),
    getProduce: builder.query({
      query: () => "/produce/" + id,
    }),
    createProduce: builder.mutation({
      query: (data) => ({
        url: "/produce",
        body: data,
        method: "post",
      }),
      invalidatesTag: ["produceList"],
    }),
    // updateProduce: builder.mutation({
    //   query: (id, data) => ({
    //     url: "/produce/" + id,
    //     body: data,
    //     method: "put",
    //   }),
    //   invalidatesTags: ["produceList"],
    // }),
    // deleteProduce: builder.mutation({
    //   query: (id) => ({
    //     url: "/produce/" + id,
    //     method: "delete",
    //   }),
    //   invalidatesTags: ["produceList"],
    // }),
  }),
});

export const {
  useGetProduceQuery,
  useCreateProduceMutation,
  useGetAllProduceQuery,
  useDeleteProduceMutation,
  useUpdateProduceMutation,
} = produceApi;
