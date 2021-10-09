import { userSlice } from "./reducer";
// const { gotOlder, doubledAge } = userSlice.actions;
import { createZomeCallAsyncAction } from "@services/redux-middleware";

const asyncHoloAction = createZomeCallAsyncAction("profiles", "create_profile");
export { asyncHoloAction };
