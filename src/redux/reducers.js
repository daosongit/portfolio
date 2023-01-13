import { createSlice } from '@reduxjs/toolkit';

const primarySideBarSlice = createSlice({
  name: 'primarySideBarSlice',
  initialState: { key: 'Explorer', isShown: true },
  reducers: {
    updateSideBar(state, action) {
      state.key = action.payload.key;
      state.isShown = action.payload.isShown;
    },
  },
});

export const { updateSideBar } = primarySideBarSlice.actions;
export default primarySideBarSlice.reducer;
