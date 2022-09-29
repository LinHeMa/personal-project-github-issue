import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

interface QueryState {
  lables: string[];
  assignees: string[];
  sort: string;
  filter: string;
}

const initialState: QueryState = {
  lables: [],
  assignees: [],
  sort: '',
  filter: '',
};

export const labelListActionSlice = createSlice({
  name: 'labelListAction',
  initialState,
  reducers: {
    addLabelCondition: (state, action: PayloadAction<string>) => {
      const repeat = _.includes(state.lables, action.payload);
      state.lables = _.uniq([...state.lables, action.payload]);
      if (repeat) _.remove(state.lables, (item) => item === action.payload);
    },
    addAssigneeCondition: (state, action: PayloadAction<string>) => {
      const repeat = _.includes(state.assignees, action.payload);
      state.assignees = [action.payload];
      if (repeat) _.remove(state.assignees, (item) => item === action.payload);
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
      state.filter = action.payload;
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
} = labelListActionSlice.actions;

export default labelListActionSlice.reducer;
