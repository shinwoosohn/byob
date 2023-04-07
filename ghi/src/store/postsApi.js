import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
      providesTags: ["postsList"],
    }),
    getPosts: builder.query({
      query: () => "/posts/" + id,
    }),
    createPosts: builder.mutation({
      query: (data) => ({
        url: "/posts",
        body: data,
        method: "post",
      }),
      invalidatesTag: ["postsList"],
    }),
    // updatePosts: builder.mutation({
    //   query: (id, data) => ({
    //     url: "/posts/" + id,
    //     body: data,
    //     method: "put",
    //   }),
    //   invalidatesTags: ["postsList"],
    // }),
    // deletePosts: builder.mutation({
    //   query: (id) => ({
    //     url: "/posts/" + id,
    //     method: "delete",
    //   }),
    //   invalidatesTags: ["postsList"],
    // }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostsMutation,
  useGetAllPostsQuery,
  useDeletePostsMutation,
  useUpdatePostsMutation,
} = postsApi;
