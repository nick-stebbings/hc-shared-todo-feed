import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createList } from "./actions";
import { TodoList, TodoLists } from "./types";

export const initialState: TodoLists | null = null;

export interface NewListPayload {
  id: string;
  list: TodoList;
}

export interface DeleteListPayload {
  id: string;
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createList(state, action: PayloadAction<NewListPayload>) {
      return {
        ...state,
        [action.payload.id]: { todos: action.payload.list },
      };
    },
    deleteList(state, action: PayloadAction<DeleteListPayload>) {
      delete state[action.payload.id];
    },
    updateList(state, action: PayloadAction<NewListPayload>) {
      return {
        ...state,
        [action.payload.id]: { todos: action.payload.list },
      };
    },
  },
});

export default todoSlice.reducer;
