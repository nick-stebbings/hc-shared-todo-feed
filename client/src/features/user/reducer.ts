import { Profile } from "./types";
import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { asyncHoloAction } from "./actions";

export const initialState: Profile = {
  nickname: "",
  fields: { avatar: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncHoloAction.success(), (state, action) => {
      const {
        payload,
        meta: { cellIdString },
      } = action;
      return { [payload.agent_pub_key]: { ...payload.profile } };
    });
    builder.addCase(asyncHoloAction.failure(), (state, action) => {
      const {
        payload,
        meta: { cellIdString },
      } = action;
      debugger;
      return state;
    });
  },
});

export default userSlice.reducer;
