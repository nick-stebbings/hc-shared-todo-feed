import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { asyncHoloAction } from "./actions";

interface UserState {
  nickname: string | null;
}

export const initialState: UserState = {
  nickname: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state) {},
    // doubledAge(state, action: PayloadAction<number>) {},
  },
  extraReducers: (builder) => {
    builder.addCase(asyncHoloAction.success(), (state, action) => {
      const {
        payload,
        type,
        meta: { cellIdString },
      } = action;
      const { nickname, fields } = payload.profile;
      debugger;
      return { ...state, fields };
    });
    builder.addCase(asyncHoloAction.failure(), (state, action) => {
      const {
        payload,
        type,
        meta: { cellIdString },
      } = action;
      debugger;
      return state;
    });
  },
});

export default userSlice.reducer;
