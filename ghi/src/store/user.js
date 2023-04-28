import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.account;
      state.token = payload.access_token;
    },
    logoutUser: (state) => {
      state.user = {};
      state.token = null;
    },
  },
});

export default userSlice.reducer;

export const { logoutUser, setUser } = userSlice.actions;
