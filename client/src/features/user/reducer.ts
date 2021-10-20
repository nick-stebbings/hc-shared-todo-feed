import { convertUint8ToHash, getMyAgentProfile } from "app/utils";
import { Profile, ProfileStore, AgentProfile } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createProfileActionCreator,
  fetchProfilesActionCreator,
} from "./actions";

export const initialState: ProfileStore = {
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
      const agentPubKeyArr = cellIdString.split(":]").slice(1)[0].split(",");
      const myProfile =
        getMyAgentProfile(convertUint8ToHash(agentPubKeyArr), payload) ||
        initialState.myProfile;
      console.log("myProfile :>> ", myProfile);

      return { ...state, myProfile, knownProfiles: [...payload] };
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
