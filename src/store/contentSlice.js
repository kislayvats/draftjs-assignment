import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const contentSlice = createSlice({
  name: "content",
  initialState: initialState,
  reducers: {
    resetContent: () => initialState,
    updateContent: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { resetContent, updateContent } = contentSlice.actions;

export default contentSlice.reducer;

