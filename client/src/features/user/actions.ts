import { userSlice } from "./reducer";
// const { gotOlder, doubledAge } = userSlice.actions;
import { createZomeCallAsyncAction } from "@services/redux-middleware";
import { base64string as defaultImage } from "./defaultImageb64";

const createProfileActionCreator = createZomeCallAsyncAction(
  "profiles",
  "create_profile"
);
const fetchProfilesActionCreator = createZomeCallAsyncAction(
  "profiles",
  "fetch_profiles"
);

const createProfile = (
  cellIdString: string,
  nickname: string,
  avatar: string = defaultImage
) =>
  createProfileActionCreator.create({
    payload: {
      nickname,
      fields: {
        avatar,
      },
    },
    cellIdString,
  });

const fetchProfiles = (
  cellIdString: string,
  nickname: string,
  avatar: string = defaultImage
) =>
  fetchProfilesActionCreator.create({
    payload: {
      nickname,
      fields: {
        avatar,
      },
    },
    cellIdString,
  });

export {
  createProfileActionCreator,
  fetchProfilesActionCreator,
  createProfile,
  fetchProfiles,
};
