import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
// import { produceApi } from "./produceApi";
// import { postsApi } from "./postsApi";
import { authApi } from "./authApi";

export const store = configureStore({
  reducer: {
    // [produceApi.reducerPath]: produceApi.reducer,
    // [postsApi.reducerPath]: postsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
