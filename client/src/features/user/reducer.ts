import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  age: number;
}

export const initialState: UserState = {
  name: "Dave",
  age: 29,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    gotOlder(state) {
      state.age++;
    },
    doubledAge(state, action: PayloadAction<number>) {
      state.age *= action.payload;
    }
  },
});

export default userSlice.reducer;