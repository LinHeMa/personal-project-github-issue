import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//TODO: check if is ok
const initialState: User = {
  avatar_url: "",
  email: "",
  email_verified: false,
  iss: "",
  preferred_username: "",
  provider_id: "",
  sub: "",
  user_name: "",
  token: null,
};

export type User = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  iss: string;
  preferred_username: string;
  provider_id: string;
  sub: string;
  user_name: string;
  token?: string | null;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      return action.payload;
    },
    signOutUser() {
      return initialState;
    },
  },
});

export const { addUser, signOutUser } = userSlice.actions;
export default userSlice.reducer;
