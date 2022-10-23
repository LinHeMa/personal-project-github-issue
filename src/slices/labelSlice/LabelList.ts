import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { LabelsList } from '../../sevices/api/labelApi';

const initialState: LabelsList[] = [];

export const LabelList = createSlice({
  name: 'LabelList',
  initialState,
  reducers: {
    initializeLabelList(state, action: PayloadAction<LabelsList[]>) {
      return action.payload;
    },
    sortAlphabetically(state) {
      return _.sortBy(state, [(element) => element.name]);
    },
    sortReverseAlphabetically(state) {
      return _.reverse(_.sortBy(state, [(element) => element.name]));
    },
    searchLables(state, action: PayloadAction<string>) {
      const query = _.toLower(_.toString(action.payload));
      if (action.payload === '') return state;
      return _.filter(state, (element) =>
        _.includes(_.toLower(element.name), query),
      );
    },
  },
});
export const {
  initializeLabelList,
  sortAlphabetically,
  sortReverseAlphabetically,
  searchLables,
} = LabelList.actions;

export default LabelList.reducer;
