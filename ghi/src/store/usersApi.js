import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["usersList"],
    }),
    getUsers: builder.query({
      query: (user_id) => `/users/${user_id}`,
    }),
    updateUsers: builder.mutation({
      query: ({ user_id, data }) => ({
        url: `/users/${user_id}`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["usersList"],
    }),
    updateDrivers: builder.mutation({
      query: ({ user_id, data }) => ({
        url: `/users/${user_id}/driver`,
        body: data,
        method: "put",
      }),
      invalidatesTags: ["driversList"],
    }),
    deleteUsers: builder.mutation({
      query: (user_id) => ({
        url: `/users/${user_id}`,
        method: "delete",
      }),
      invalidatesTags: ["usersList"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUsersQuery,
  useUpdateUsersMutation,
  useUpdateDriversMutation,
  useDeleteUsersMutation,
} = usersApi;
