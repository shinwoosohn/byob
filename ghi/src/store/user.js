import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, { payload }) => {
      state.token = payload.access_token;
      state.user = payload.account;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
