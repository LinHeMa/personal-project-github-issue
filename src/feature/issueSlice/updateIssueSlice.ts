import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

type updateIssueType = {
  id: number | string;
  body: string;
};

const initialState: updateIssueType[] = [{ id: 0, body: '' }];

export const updateIssueSlice = createSlice({
  name: 'updateIssue',
  initialState,
  reducers: {
    resetNewComment: () => initialState,
    addEditComment: (state, action: PayloadAction<updateIssueType>) => {
      state.push({ id: action.payload.id, body: action.payload.body });
      state = _.uniqBy(state, 'id');
    },
    removeAnEditingComment: (state, action: PayloadAction<number | string>) => {
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
  resetNewComment,
  addEditComment,
  removeAnEditingComment,
  editCommentBody,
} = updateIssueSlice.actions;

export default updateIssueSlice.reducer;
