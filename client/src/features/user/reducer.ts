import { convertUint8ToHash, getMyAgentProfile } from "app/utils";
import { Profile, ProfileStore, AgentProfile } from "./types";

import { userAvatar as defaultMyImage } from "./components/Profiles/testImage";
import { defaultImage } from "./components/Profiles/defaultImage";
import { createSlice } from "@reduxjs/toolkit";
import apis from "services/zomeApis";

export const initialState: ProfileStore = {
  myProfile: { nickname: "", fields: { avatar: "" } },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      apis.profiles["create_profile"].success(),
      (state, action) => {
        const {
          payload,
          meta: { cellIdString },
        } = action;
        return {
          ...state,
          myProfile: {
            nickname: payload.profile.nickname,
            fields: {
              avatar: payload.profile.avatar || defaultMyImage,
              agentPubKey: payload.agent_pub_key,
            },
          },
        };
      }
    );
    builder.addCase(
      apis.profiles["create_profile"].failure(),
      (state, action) => {
        const {
          payload,
          meta: { cellIdString },
        } = action;
        return state;
      }
    );
    builder.addCase(
      apis.profiles["get_all_profiles"].success(),
      (state, action) => {
        const {
          payload,
          meta: { cellIdString },
        } = action;
        const agentPubKeyArr = cellIdString.split(":]").slice(1)[0].split(",");
        const myProfile =
          getMyAgentProfile(convertUint8ToHash(agentPubKeyArr), payload) ||
          state.myProfile;
        console.log(
          "agentPubKeyArr, myProfile :>> ",
          agentPubKeyArr,
          myProfile
        );
        const restOfProfiles = payload.slice(1);
        return {
          ...state,
          myProfile,
          knownProfiles: [
            ...restOfProfiles.map(
              ({ agent_pub_key, profile: { nickname, fields } }: any) => {
                return {
                  profile: {
                    nickname,
                    fields: {
                      ...fields,
                      avatar: fields.avatar || defaultImage,
                      agentPubKey: agent_pub_key,
                    },
                  },
                };
              }
            ),
          ],
        };
      }
    );
    builder.addCase(
      apis.profiles["get_all_profiles"].failure(),
      (state, action) => {
        const {
          payload,
          meta: { cellIdString },
        } = action;
        return state;
      }
    );
  },
});

export default userSlice.reducer;
