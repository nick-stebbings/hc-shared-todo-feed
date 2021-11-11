import zomeApis, { actionTypes } from "services/zomeApis";

import { Space, SpaceInfo } from "./types";
import { spaceSlice } from "./reducer";

const { createSpace, deleteSpace, updateSpace } = spaceSlice.actions;

export { createSpace, deleteSpace, updateSpace };
