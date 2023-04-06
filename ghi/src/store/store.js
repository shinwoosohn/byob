import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { produceApi } from "./produceApi";

export const store = configureStore({
  reducer: {
    [produceApi.reducerPath]: produceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(produceApi.middleware),
});

setupListeners(store.dispatch);
