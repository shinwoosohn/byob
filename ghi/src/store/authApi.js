import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./user";

export const authApi = createApi({
  reducerPath: "authentication",
  tagTypes: ["Token"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BYOB_SERVICE_API_HOST,
    credentials: "include",
    prepareHeaders: async (headers, { getState }) => {
      const token = await getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append("username", info.username);
          formData.append("password", info.password);
        }
        return {
          url: "/token",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Token"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(authApi.endpoints.getToken.initiate());
        } catch (e) {
          console.error(e);
        }
      },
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      providesTags: ["Token"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (e) {
          console.error(e);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "delete",
      }),
      invalidateTags: ["Token"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("token"); // remove token from local storage
          sessionStorage.removeItem("token"); // remove token from session storage
        } catch (error) {
          console.error(error);
        }
      },
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/users",
        body: data,
        method: "post",
        credentials: "include",
      }),
      invalidateTags: ["Token"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetTokenQuery,
  useLogoutMutation,
  useSignupMutation,
} = authApi;
