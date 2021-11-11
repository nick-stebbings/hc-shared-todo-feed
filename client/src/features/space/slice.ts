import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Space,
  NewSpacePayload,
  DeleteSpacePayload,
  UpdateSpacePayload,
} from "./types";
import { Dictionary, TimeFrame } from "app/types";

export interface Space {
  timeframe: TimeFrame;
}

export interface NewSpacePayload {
  spaceId: string;
  space: Space;
}

export interface DeleteSpacePayload {
  spaceId: string;
}

export interface UpdateSpacePayload {
  spaceId: string;
  spacePatch: Partial<Space>;
}
// import merge from "deepmerge";
import luxon from "luxon";

const daySpace = (numberOfDays: any = 1): Space => ({
  timeframe: {
    fromDate: luxon.DateTime.local().startOf("day"),
    toDate: luxon.DateTime.local().endOf("day"),
    length: luxon.Duration.fromObject({ days: numberOfDays }),
  },
});

export const initialState: Dictionary<Space[]> = {
  thisWeek: Array.from("1234567").map(daySpace),
  lastWeek: Array.from("1234567").map(daySpace),
};

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    createSpace(state, action: PayloadAction<NewSpacePayload>) {
      const { spaces, id } = action.payload.space;
      return {
        ...state,
        [String(id)]: { space: spaces || [] },
      };
    },
    deleteSpace(state, action: PayloadAction<DeleteSpacePayload>) {
      delete state[action.payload.id];
    },
    updateSpace(state, action: PayloadAction<NewSpacePayload>) {
      const { spaces, id } = action.payload.space;
      return {
        ...state,
        [String(id)]: { spaces },
      };
    },
  },
});

export default spaceSlice;
