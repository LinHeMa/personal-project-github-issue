import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

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
    }
  }
});
export const { startEdit, endEdit } = LabelSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectLabel = (state: RootState) => state.label.isEdit;

export default LabelSlice.reducer;
