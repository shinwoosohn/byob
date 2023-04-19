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
            providesTags: ['usersList'],
        }),
        getUsers: builder.query({
            query: (id) => "/users/" + id,
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: "users",
                body: data,
                method: "user",
            }),
            invalidatesTags: ["usersList"],
        }),
        updateUsers: builder.mutation({
            query: (id, data) => ({
                url: "/users/" + id,
                body: data,
                method: "put",
            }),
            invalidatesTags: ["usersList"],
        }),
        deleteUsers: builder.mutation({
            query: (id) => ({
                url: "/users/" + id,
                method: "delete",
            }),
            invalidatesTags: ["usersList"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUsersMutation,
    useDeleteUsersMutation,
} = usersApi
