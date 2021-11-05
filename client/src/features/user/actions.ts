import { store } from "app/store";
import zomeApis, { ProfilesZomeActionStrings } from "services/zomeApis";

import { userAvatar as defaultImage } from "./components/Profiles/testImage";

const createProfileZome = (
  nickname: string,
  avatar: string = defaultImage,
  cellIdString: string = store.getState()?.cell?.cellIdString
) =>
  zomeApis.profiles[ProfilesZomeActionStrings["0"]].create({
    payload: {
      nickname,
      fields: {
        avatar,
      },
    },
    cellIdString,
  });

const fetchProfilesZome = (cellIdString: string) =>
  zomeApis.profiles[ProfilesZomeActionStrings["1"]].create();

const fetchMyProfileZome = (cellIdString: string) =>
  zomeApis.profiles[ProfilesZomeActionStrings["2"]].create();

export { createProfileZome, fetchProfilesZome, fetchMyProfileZome };
