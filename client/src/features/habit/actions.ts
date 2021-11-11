// import zomeApis, { ActionTypes } from "services/zomeApis";

import { Habit, HabitInfo } from "./types";
import { habitSlice } from "./reducer";
const { createHabit, deleteHabit, updateHabit } = habitSlice.actions;

// const createHabitZome = (
//   cellIdString: string,
//   list: Habit
// ): Promise<HabitInfo> =>
//   zomeApis.reddot[ActionTypes["0"]].create({
//     cellIdString,
//     payload: {payload},
//   });

// const fetchHabitZome = (cellIdString: string): Promise<HabitInfo> =>
//   zomeApis.reddot[ActionTypes["1"]].create({
//     cellIdString,
//   });

// const updateHabitZome = (
//   cellIdString: string,
//   list: Habit
// ): Promise<TodoListInfo> =>
//   zomeApis.reddot[ActionTypes["2"]].create({
//     cellIdString,
//     payload: {payload},
//   });

export {
  ActionTypes,
  createHabit,
  deleteHabit,
  updateHabit,
  // createHabitZome,
  // fetchHabitZome,
  // updateHabitZome
};
