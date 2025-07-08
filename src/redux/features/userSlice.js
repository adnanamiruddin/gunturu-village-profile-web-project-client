import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        Cookies.remove("actkn");
        Cookies.remove("lggnnusr");
      }
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

// Selector Helper
export const selectUser = (state) => state.user;
