import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

interface QueryState {
  lables: string[];
  assignees: string[];
  sort: string;
  filter: string;
  state: string;
  open: boolean;
  issue: boolean;
  page: number;
}

const initialState: QueryState = {
  lables: [],
  assignees: [],
  sort: '',
  filter: '',
  state: 'open',
  open: true,
  issue: true,
  page: 1,
};

export const labelListActionSlice = createSlice({
  name: 'labelListAction',
  initialState,
  reducers: {
    addLabelCondition: (state, action: PayloadAction<string>) => {
      const repeat = _.includes(state.lables, action.payload);
      state.lables = _.uniq([...state.lables, action.payload]);
      if (repeat) {
        _.remove(state.lables, (item) => item === action.payload);
      }
    },
    addAssigneeCondition: (state, action: PayloadAction<string>) => {
      const repeat = _.includes(state.assignees, action.payload);
      state.assignees = [action.payload];
      if (repeat) {
        _.remove(state.assignees, (item) => item === action.payload);
      }
    },
    addSortCondition: (state, action: PayloadAction<string>) => {
      if (action.payload === state.sort) state.sort = '';
      state.sort = action.payload;
    },
    addFilterCondition: (state, action: PayloadAction<string>) => {
      if (action.payload === state.filter) {
        state.filter = '';
        return;
      }
      state.lables = [];
      state.assignees = [];
      state.sort = '';
      state.state = 'open';
      state.filter = action.payload;
    },
    addStateCondition: (state, action: PayloadAction<string>) => {
      if (action.payload === state.state) {
        state.state = '';
        return;
      }
      state.state = action.payload;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    previousPage: (state) => {
      state.page -= 1;
    },
    resetLabelCondition: (state) => {
      state.lables = [];
    },
    resetAssigneeCondition: (state) => {
      state.assignees = [];
    },
    resetSortCondition: (state) => {
      state.sort = '';
    },
    resetAll: () => {
      return initialState;
    },
  },
});

export const {
  addLabelCondition,
  addAssigneeCondition,
  addSortCondition,
  resetLabelCondition,
  resetAssigneeCondition,
  resetSortCondition,
  addFilterCondition,
  addStateCondition,
  resetAll,
  nextPage,
  previousPage,
} = labelListActionSlice.actions;

export default labelListActionSlice.reducer;
