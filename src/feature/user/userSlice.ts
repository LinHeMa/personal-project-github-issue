import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = { userInfo: "" };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<string>) {
      state.userInfo = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
