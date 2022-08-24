import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");

const userIsLoggedIn = !!initialToken;

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: initialToken,
    isLoggedIn: userIsLoggedIn,
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.isLoggedIn = true;
    },
    removeUser(state) {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
