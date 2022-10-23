import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { labelApi } from '../sevices/api/labelApi';
import createIssueReducer from '../slices/issueSlice/issueSlice';
import updateIssueReducer from '../slices/issueSlice/updateIssueSlice';
import labelListReducer from '../slices/labelSlice/LabelList';
import labelListActionReducer from '../slices/labelSlice/LabelListActionSlice';
import userInfoReducer from '../slices/userSlice/userSlice';

export const store = configureStore({
  reducer: {
    // local action
    labelListAction: labelListActionReducer,
    userInfoAction: userInfoReducer,
    createIssueAction: createIssueReducer,
    updateIssueAction: updateIssueReducer,
    labelListDataAction: labelListReducer,
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
