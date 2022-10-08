import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import LabelSlice from './LabelSlice';

interface postQuery {
  name: string;
  repo: string;
  title: string;
  body: string;
  assignees: string[];
  labels: string[];
}

const initialState: postQuery = {
  name: 'LinHeMa',
  repo: 'TEST',
  title: '',
  body: '',
  assignees: [],
  labels: [],
};

function insert(
  textArea: HTMLTextAreaElement,
  startTag: string,
  endTag: string,
) {
  const selectionStart = textArea.selectionStart;
  const selectionEnd = textArea.selectionEnd;
  const oldText = textArea.value;

  const prefix = oldText.substring(0, selectionStart);
  const inserted =
    startTag + oldText.substring(selectionStart, selectionEnd) + endTag;
  const suffix = oldText.substring(selectionEnd);
  textArea.value = `${prefix}${inserted}${suffix}`;

  const newSelectionStart = selectionStart + startTag.length;
  const newSelectionEnd = selectionEnd + startTag.length;
  textArea.setSelectionRange(newSelectionStart, newSelectionEnd);

  textArea.focus();
}

export const createIssueSlice = createSlice({
  name: 'createIssue',
  initialState,
  reducers: {
    resetAll: () => initialState,
    addTitle: (state, action: PayloadAction<string>) => {
      return { ...state, title: action.payload };
    },
    addBody: (state, action: PayloadAction<string>) => {
      return { ...state, body: action.payload };
    },
    addLabel: (state, action: PayloadAction<string>) => {
      const repeat = _.find(state.labels, (label) => label === action.payload);
      state.labels.push(action.payload);
      state.labels = _.filter(state.labels, (label) => label !== repeat);
    },
    addAssignee: (state, action: PayloadAction<string>) => {
      const repeat = _.find(
        state.assignees,
        (assignee) => assignee === action.payload,
      );
      state.assignees.push(action.payload);
      state.assignees = _.filter(
        state.assignees,
        (assignee) => assignee !== repeat,
      );
    },
    addHeadingText: (state, action: PayloadAction<HTMLTextAreaElement>) => {
      if (!action.payload) return;
      insert(action.payload, '### ', '');
      state.body = action.payload.value;
    },
    addBoldText: (state, action: PayloadAction<HTMLTextAreaElement>) => {
      if (!action.payload) return;
      insert(action.payload, '**', '**');
      state.body = action.payload.value;
    },
    addItliacText: (state, action: PayloadAction<HTMLTextAreaElement>) => {
      if (!action.payload) return;
      insert(action.payload, '*', '*');
      state.body = action.payload.value;
    },
    addQuoteText: (state, action: PayloadAction<HTMLTextAreaElement>) => {
      if (!action.payload) return;
      insert(action.payload, '>', '');
      state.body = action.payload.value;
    },
    addCodeText: (state, action: PayloadAction<HTMLTextAreaElement>) => {
      if (!action.payload) return;
      insert(action.payload, '`', '`');
      state.body = action.payload.value;
    },
    addTagText: (state, action: PayloadAction<HTMLTextAreaElement>) => {
      if (!action.payload) return;
      insert(action.payload, '@', '');
      state.body = action.payload.value;
    },
  },
});

export const {
  resetAll,
  addTitle,
  addBody,
  addLabel,
  addAssignee,
  addHeadingText,
  addBoldText,
  addItliacText,
  addQuoteText,
  addCodeText,
  addTagText,
} = createIssueSlice.actions;

export default createIssueSlice.reducer;
