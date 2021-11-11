import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Habit,
  HabitInfo,
  NewHabitPayload,
  DeleteHabitPayload,
  UpdateHabitPayload,
} from "./types";
import { RedDotActionTypes } from "services/restApis";
import { Dictionary } from "app/types";

import merge from "deepmerge";
import luxon from "luxon";

export const initialState: Dictionary<Habit> = {
  currentHabit: {
    timeframe: {
      fromDate: luxon.DateTime.local().startOf("day"),
      toDate: luxon.DateTime.local().endOf("day"),
      length: luxon.Duration.fromObject({ days: 1 }),
    },
    list_hash: "",
    meta: {
      name: "",
      id: 0,
    },
  },
};

export const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    createHabit(state, action: PayloadAction<NewHabitPayload>) {
      const { id, habit } = action.payload;
      return {
        ...state,
        [String(id)]: { habit },
      };
    },
    deleteHabit(state, action: PayloadAction<DeleteHabitPayload>) {
      delete state[action.payload.id];
    },
    updateHabit(state, action: PayloadAction<NewHabitPayload>) {
      const { id, habit } = action.payload;
      return {
        ...state,
        [String(id)]: { habit },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RedDotActionTypes["1"], (state, action) => {
      debugger;
      return { ...state };
    });
    //  builder.addMatcher(isLoadingAction, (state) => ({
    //    responseStatus: loadingState,
    //  }));
    //  builder.addMatcher(isErrorAction, (state) => ({
    //    responseStatus: errorState,
    //  }));
    //  builder.addDefaultCase((state) => ({
    //    responseStatus: idleState,
    //  }));
  },
});

export default habitSlice.reducer;
