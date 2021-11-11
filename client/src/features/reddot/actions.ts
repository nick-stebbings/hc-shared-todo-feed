import zomeApis, { RedDotActionTypes } from "services/zomeApis";

import { RedDot, RedDotInfo } from "./types";
import { redDotSlice } from "./reducer";
const { createRedDot, deleteRedDot, updateRedDot } = redDotSlice.actions;

// const createRedDotZome = (
//   cellIdString: string,
//   list: RedDot
// ): Promise<RedDotInfo> =>
//   zomeApis.reddot[RedDotActionTypes["0"]].create({
//     cellIdString,
//     payload: payload,
//   });

// const fetchRedDotZome = (cellIdString: string): Promise<RedDotInfo> =>
//   zomeApis.reddot[RedDotActionTypes["1"]].create({
//     cellIdString,
//   });

// const updateRedDotZome = (
//   cellIdString: string,
//   list: RedDot
// ): Promise<TodoListInfo> =>
//   zomeApis.reddot[RedDotActionTypes["2"]].create({
//     cellIdString,
//     payload: payload,
//   });

export {
  RedDotActionTypes,
  createRedDot,
  deleteRedDot,
  updateRedDot,
  // createRedDotZome,
  // fetchRedDotZome,
  // updateRedDotZome,
};
