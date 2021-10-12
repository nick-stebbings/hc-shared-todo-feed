import { userSlice } from "./reducer";
import { createZomeCallAsyncAction } from "@services/redux-middleware";
import { base64string as defaultImage } from "./defaultImageb64";

const createProfileActionCreator = createZomeCallAsyncAction(
  "profiles",
  "create_profile"
);
const fetchProfilesActionCreator = createZomeCallAsyncAction(
  "profiles",
  "get_all_profiles"
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

const fetchProfiles = (cellIdString: string) =>
  fetchProfilesActionCreator.create({
    cellIdString,
  });

export {
  createProfileActionCreator,
  fetchProfilesActionCreator,
  createProfile,
  fetchProfiles,
};
