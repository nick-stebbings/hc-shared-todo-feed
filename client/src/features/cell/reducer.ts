import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CellState {
  cellIdString: string | null;
}

export const initialState: CellState = {
  cellIdString: null,
};

export const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    setCellIdString(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export default cellSlice.reducer;
