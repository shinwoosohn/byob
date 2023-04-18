import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { produceApi } from "./produceApi";
import { usersApi } from "./usersApi";
import { postsApi } from "./postsApi";
import { authApi } from "./authApi";
import { userSlice } from "./user";

export const store = configureStore({
  reducer: {
    auth: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(postsApi.middleware)
      .concat(usersApi.middleware),
});

setupListeners(store.dispatch);
