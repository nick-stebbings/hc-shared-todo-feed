import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RedDot,
  RedDotInfo,
  NewRedDotPayload,
  DeleteRedDotPayload,
  UpdateRedDotPayload,
} from "./types";
import merge from "deepmerge";
import luxon from "luxon";

export const initialState: Partial<RedDot> = {
  timeframe: {
    fromDate: luxon.DateTime.local().startOf("day"),
    toDate: luxon.DateTime.local().endOf("day"),
    length: luxon.Duration.fromObject({ days: 1 }),
  },
  habit_hash: "",
};

export const redDotSlice = createSlice({
  name: "redDot",
  initialState,
  reducers: {
    createRedDot(state, action: PayloadAction<NewRedDotPayload>) {
      const { redDots, id } = action.payload.redDot;
      return {
        ...state,
        [String(id)]: { redDot: redDot || [] },
      };
    },
    deleteRedDot(state, action: PayloadAction<DeleteRedDotPayload>) {
      delete state[action.payload.id];
    },
    updateRedDot(state, action: PayloadAction<NewRedDotPayload>) {
      const { redDot, id } = action.payload.redDot;
      return {
        ...state,
        [String(id)]: { redDots },
      };
    },
  },
});

export default redDotSlice.reducer;
