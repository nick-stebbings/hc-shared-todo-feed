import { Profile } from "./types";
import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { createProfileActionCreator } from "./actions";

export const initialState: Profile = {
  nickname: "",
  fields: { avatar: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProfileActionCreator.success(), (state, action) => {
      const {
        payload,
        meta: { cellIdString },
      } = action;
      return { [payload.agent_pub_key]: { ...payload.profile } };
    });
    builder.addCase(createProfileActionCreator.failure(), (state, action) => {
      const {
        payload,
        meta: { cellIdString },
      } = action;
      debugger;
      return state;
    });
    builder.addCase(createProfileActionCreator.request(), (state, action) => {
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
