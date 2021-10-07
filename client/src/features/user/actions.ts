import { userSlice } from "./reducer";
const { gotOlder, doubledAge } = userSlice.actions;
import { createZomeCallAsyncAction } from "@/services/redux-middleware";

const asyncHoloAction = createZomeCallAsyncAction("profiles", "who_am_i");
console.log(
  asyncHoloAction.create({ payload: { name: "Dave" }, cellIdString: "123" })
);

export { gotOlder, doubledAge, asyncHoloAction };
