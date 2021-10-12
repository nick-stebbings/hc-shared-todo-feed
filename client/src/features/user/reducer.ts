import { Profile } from "./types";
import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import {
  createProfileActionCreator,
  fetchProfilesActionCreator,
} from "./actions";

export const initialState: Profile = {
  myProfile: { nickname: "", fields: { avatar: "" } },
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
      return { ...state, myProfile: { ...payload.profile } };
    });
    builder.addCase(createProfileActionCreator.failure(), (state, action) => {
      const {
        payload,
        meta: { cellIdString },
      } = action;
      return state;
    });
    builder.addCase(fetchProfilesActionCreator.success(), (state, action) => {
      const {
        payload,
        meta: { cellIdString },
      } = action;

      return { ...state, knownProfiles: [...payload] };
    });
    builder.addCase(fetchProfilesActionCreator.failure(), (state, action) => {
      const {
        payload,
        meta: { cellIdString },
      } = action;
      return state;
    });
  },
});

export default userSlice.reducer;
