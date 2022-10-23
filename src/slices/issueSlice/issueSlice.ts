import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

interface postQuery {
  prev_title: string;
  prev_body: string;
  prev_assignees: string[];
  prev_labels: string[];
  prev_state?: string;
  prev_stateReason?: string;
  prev_buttonNow?: string;

  title?: string;
  body?: string;
  assignees?: string[];
  labels?: string[];
  state?: string;
  stateReason?: string;
  buttonNow?: string;
}

const initialState: postQuery = {
  prev_title: '',
  prev_body: '',
  prev_assignees: [],
  prev_labels: [],
  prev_state: '',
  prev_stateReason: '',
  prev_buttonNow: '',

  title: '',
  body: '',
  assignees: [],
  labels: [],
  state: '',
  stateReason: '',
  buttonNow: '',
};

type stateType = {
  state: string;
  stateReason: string;
  buttonNow?: string;
};
type initializeIssueParams = {
  title?: string;
  body?: string;
  assignees?: string[];
  labels?: string[];
  state?: string;
  stateReason?: string;
  buttonNow?: string;
};

export const createIssueSlice = createSlice({
  name: 'createIssue',
  initialState,
  reducers: {
    resetAll: (state) => {
      const {
        prev_title,
        prev_body,
        prev_assignees,
        prev_labels,
        prev_state: pervState,
        prev_stateReason,
        prev_buttonNow,
      } = state;
      return {
        prev_title,
        title: prev_title,
        prev_body,
        body: prev_body,
        prev_assignees,
        assignees: prev_assignees,
        prev_labels,
        labels: prev_labels,
        prev_state: pervState,
        state: pervState,
        prev_stateReason,
        stateReason: prev_stateReason,
        prev_buttonNow,
        buttonNow: prev_buttonNow,
      };
    },
    initializeIssue: (state, action: PayloadAction<initializeIssueParams>) => {
      const {
        title = '',
        body = '',
        assignees = [],
        labels = [],
        state: initailState = '',
        stateReason = '',
        buttonNow = '',
      } = action.payload;
      if (title) {
        state.title = title;
        state.prev_title = title;
      }
      if (body) {
        state.body = body;
        state.prev_body = body;
      }
      if (assignees) {
        state.assignees = assignees;
        state.prev_assignees = assignees;
      }
      if (labels) {
        state.labels = labels;
        state.prev_labels = labels;
      }
      if (initailState) {
        state.state = initailState;
        state.prev_state = initailState;
      }
      if (stateReason) {
        state.stateReason = stateReason;
        state.prev_stateReason = stateReason;
      }
      if (buttonNow) {
        state.buttonNow = buttonNow;
        state.prev_buttonNow = buttonNow;
      }
    },
    editTitle: (state, action: PayloadAction<string>) => {
      return { ...state, title: action.payload };
    },
    editBody: (state, action: PayloadAction<string>) => {
      return { ...state, body: action.payload };
    },
    editLabel: (state, action: PayloadAction<string>) => {
      const repeat = _.find(state.labels, (label) => label === action.payload);
      if (state.labels) state.labels.push(action.payload);
      state.labels = _.filter(state.labels, (label) => label !== repeat);
    },
    editAssignee: (state, action: PayloadAction<string>) => {
      const repeat = _.find(
        state.assignees,
        (assignee) => assignee === action.payload,
      );
      if (state.assignees) state.assignees.push(action.payload);
      state.assignees = _.filter(
        state.assignees,
        (assignee) => assignee !== repeat,
      );
    },
    editState: (state, action: PayloadAction<stateType>) => {
      state.state = action.payload.state;
      state.stateReason = action.payload.stateReason;
      state.buttonNow = action.payload.buttonNow;
    },
    changeButtonState: (state, action: PayloadAction<string>) => {
      state.buttonNow = action.payload;
    },
    newIssue: () => initialState,
  },
});

export const {
  resetAll,
  initializeIssue,
  editTitle,
  editBody,
  editLabel,
  editAssignee,
  editState,
  changeButtonState,
  newIssue,
} = createIssueSlice.actions;

export default createIssueSlice.reducer;
