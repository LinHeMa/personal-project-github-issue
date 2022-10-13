import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
const tokenInLocalStorage = _.get(JSON.parse(localStorage.getItem('user')!), [
  'currentSession',
  'access_token',
]);

const initialState: User = {
  avatar_url: '',
  email: '',
  email_verified: false,
  iss: '',
  preferred_username: '',
  provider_id: '',
  sub: '',
  user_name: JSON.parse(sessionStorage.getItem('user')!) || '',
  token: tokenInLocalStorage || '',
  chosenRepo: JSON.parse(sessionStorage.getItem('repo')!) || '',
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
  chosenRepo: string;
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      const {
        avatar_url,
        email,
        email_verified,
        iss,
        preferred_username,
        provider_id,
        sub,
        user_name,
        token,
      } = action.payload;
      return {
        ...state,
        avatar_url,
        email,
        email_verified,
        iss,
        preferred_username,
        provider_id,
        sub,
        user_name,
        token,
      };
    },
    chooseRepo(state, action: PayloadAction<string>) {
      state.chosenRepo = action.payload;
    },
    signOutUser() {
      sessionStorage.clear();
      return initialState;
    },
  },
});

export const { addUser, signOutUser, chooseRepo } = userSlice.actions;
export default userSlice.reducer;
