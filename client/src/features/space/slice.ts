import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dictionary, TimeFrame } from "app/types";
import { RootState } from "app/store";

export const getThisWeekSpaces = (state: RootState) => {
  return state?.space.thisWeek;
};
export const getLastWeekSpaces = (state: RootState) => {
  return state?.space.lastWeek;
};

export interface Space {
  timeframe: TimeFrame;
}

// export interface NewSpacePayload {
//   spaceId: string;
//   space: Space;
// }

// export interface DeleteSpacePayload {
//   spaceId: string;
// }

// export interface UpdateSpacePayload {
//   spaceId: string;
//   spacePatch: Partial<Space>;
// }
// import merge from "deepmerge";
import luxon from "luxon";

const daySpace = (numberOfDays: any = 1): Space => ({
  timeframe: {
    fromDate: luxon.DateTime.local().startOf("day"),
    toDate: luxon.DateTime.local().endOf("day"),
    length: luxon.Duration.fromObject({ days: numberOfDays }),
  },
});

const weekOfDaySpaces = (): Space[] => Array.from("1234567").map(daySpace);

export const initialState: Dictionary<Space[]> = {
  thisWeek: weekOfDaySpaces,
  lastWeek: weekOfDaySpaces,
};

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {},
});

export default spaceSlice;
