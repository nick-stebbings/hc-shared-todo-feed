import { userSlice } from "./reducer";
// const { gotOlder, doubledAge } = userSlice.actions;
import { createZomeCallAsyncAction } from "@services/redux-middleware";
import { base64string as defaultImage } from "./defaultImageb64";

const asyncHoloAction = createZomeCallAsyncAction("profiles", "create_profile");

const createUser = (
  cellIdString: string,
  nickname: string,
  avatar: string = defaultImage
) =>
  asyncHoloAction.create({
    payload: {
      nickname,
      fields: {
        avatar,
      },
    },
    cellIdString,
  });

export { createUser, asyncHoloAction };
