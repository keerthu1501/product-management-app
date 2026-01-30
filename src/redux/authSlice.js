import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  isLoggedIn: !!Cookies.get("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 1 });
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      Cookies.remove("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
