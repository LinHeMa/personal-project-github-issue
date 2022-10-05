import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { labelApi } from '../sevices/api/labelApi';
import labelListActionReducer from '../feature/Label/LabelListActionSlice';
import userInfoReducer from '../feature/user/userSlice';
import createIssueReducer from '../feature/Label/createIssueSlice';

export const store = configureStore({
  reducer: {
    // local action
    labelListAction: labelListActionReducer,
    userInfoAction: userInfoReducer,
    createIssueAction: createIssueReducer,

    // Api
    [labelApi.reducerPath]: labelApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([labelApi.middleware]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
