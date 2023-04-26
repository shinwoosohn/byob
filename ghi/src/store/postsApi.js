import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
      providesTags: ["postsList"],
    }),
    getPosts: builder.query({
      query: (posts_id) => `/posts/${posts_id}`,
    }),
    createPosts: builder.mutation({
      query: (data) => ({
        url: "/posts",
        body: data,
        method: "post",
      }),
      invalidatesTag: ["postsList"],
    }),
    updatePosts: builder.mutation({
      query: ({ posts_id, data }) => ({
        url: `/posts/${posts_id}`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["postsList"],
    }),
    deletePosts: builder.mutation({
      query: (posts_id) => ({
        url: `/posts/${posts_id}`,
        method: "delete",
      }),
      invalidatesTags: ["postsList"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostsMutation,
  useGetAllPostsQuery,
  useDeletePostsMutation,
  useUpdatePostsMutation,
} = postsApi;
