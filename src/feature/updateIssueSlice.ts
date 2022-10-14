import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

type updateIssueType = {
  id: number;
  body: string;
};

const initialState: updateIssueType[] = [];

export const updateIssueSlice = createSlice({
  name: 'updateIssue',
  initialState,
  reducers: {
    resetAll: () => initialState,
    addEditComment: (state, action: PayloadAction<updateIssueType>) => {
      state.push({ id: action.payload.id, body: action.payload.body });
      state = _.uniqBy(state, 'id');
    },
    removeAnEditingComment: (state, action: PayloadAction<number>) => {
      return (state = _.filter(
        state,
        (comment) => comment.id !== action.payload,
      ));
    },
    editCommentBody: (state, action: PayloadAction<updateIssueType>) => {
      const targetComment = _.find(state, { id: action.payload.id });
      if (!_.isEmpty(targetComment)) targetComment.body = action.payload.body;
    },
  },
});

export const {
  resetAll,
  addEditComment,
  removeAnEditingComment,
  editCommentBody,
} = updateIssueSlice.actions;

export default updateIssueSlice.reducer;
