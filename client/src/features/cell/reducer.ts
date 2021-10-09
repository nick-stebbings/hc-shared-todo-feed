import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

interface CellState {
  stringId: string | null;
}

export const initialState: CellState = {
  stringId: null,
};

export const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    setStringId(state, action: PayloadAction<string>) {
      debugger;
    },
  },
});

export default cellSlice.reducer;
