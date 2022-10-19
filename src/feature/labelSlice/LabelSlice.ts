import { createSlice } from '@reduxjs/toolkit';

type LabelsList = {
  isEdit: boolean;
};

const initialState: LabelsList = { isEdit: false };
export const LabelSlice = createSlice({
  name: 'label',
  initialState,
  reducers: {
    startEdit(state) {
      state.isEdit = true;
    },
    endEdit: (state) => {
      state.isEdit = false;
    },
  },
});
export const { startEdit, endEdit } = LabelSlice.actions;

export default LabelSlice.reducer;
