import BASE_URL, { RedDotActionTypes } from "services/restApis";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { Habit, HabitInfo } from "./types";
import { habitSlice } from "./reducer";
const { createHabit, deleteHabit, updateHabit } = habitSlice.actions;

const MODEL = "habits";

// const createHabitZome = (
//   cellIdString: string,
//   list: Habit
// ): Promise<HabitInfo> =>
//   zomeApis.reddot[RedDotActionTypes["0"]].create({
//     cellIdString,
//     payload: {payload},
//   });

const fetchHabitREST = (habitId: number): any =>
  createAsyncThunk(RedDotActionTypes["1"], async (thunkAPI) => {
    const res = await fetch(`${BASE_URL}/${MODEL}/${habitId}`).then((data) =>
      data.json()
    );
    return res;
  });

// const updateHabitZome = (
//   cellIdString: string,
//   list: Habit
// ): Promise<TodoListInfo> =>
//   zomeApis.reddot[RedDotActionTypes["2"]].create({
//     cellIdString,
//     payload: {payload},
//   });

export {
  RedDotActionTypes,
  createHabit,
  deleteHabit,
  updateHabit,
  // createHabitZome,
  fetchHabitREST,
  // updateHabitZome
};
