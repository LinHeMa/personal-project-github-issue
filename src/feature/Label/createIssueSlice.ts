import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

interface postQuery {
  name: string;
  repo: string;
  title: string;
  body: string;
  assignees: string[];
  labels: string[];
  state?: string;
  stateReason?: string;
  buttonNow?: string;
}

const initialState: postQuery = {
  name: '',
  repo: '',
  title: '',
  body: '',
  assignees: [],
  labels: [],
  state: '',
  stateReason: '',
  buttonNow: '',
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

type addBasicInfoType = {
  name: string;
  repo: string;
};

type stateType = {
  state: string;
  stateReason: string;
  buttonNow?: string;
};

export const createIssueSlice = createSlice({
  name: 'createIssue',
  initialState,
  reducers: {
    resetAll: () => initialState,
    addBasicInfo: (state, action: PayloadAction<addBasicInfoType>) => {
      state.name = action.payload.name;
      state.repo = action.payload.repo;
    },
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
    addState: (state, action: PayloadAction<stateType>) => {
      state.state = action.payload.state;
      state.stateReason = action.payload.stateReason;
      state.buttonNow = action.payload.buttonNow;
    },
    changeButtonState: (state, action: PayloadAction<string>) => {
      state.buttonNow = action.payload;
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
  addBasicInfo,
  addState,
  changeButtonState,
} = createIssueSlice.actions;

export default createIssueSlice.reducer;
