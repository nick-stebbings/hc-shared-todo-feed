import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoList, TodoLists } from "./types";
import merge from "deepmerge";

export const initialState: TodoLists | null = null;

export interface NewListPayload {
  id: string;
  list: TodoList;
}

export interface NewTodoPayload {
  listId: string;
  todo: Todo;
}

export interface DeleteListPayload {
  id: string;
}

export interface DeleteTodoPayload {
  listId: string;
  id: string;
}

export interface UpdateTodoPayload {
  listId: string;
  todoPatch: Partial<Todo>;
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createList(state, action: PayloadAction<NewListPayload>) {
      return {
        ...state,
        [action.payload.id]: { todos: action.payload.list || [] },
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
    createTodo(state, action: PayloadAction<NewTodoPayload>) {
      if (state[action.payload.listId]?.todos) {
        state[action.payload.listId].todos?.push(action.payload.todo);
      } else {
        state[action.payload.listId].todos = [action.payload.todo];
      }
    },
    deleteTodo(state, action: PayloadAction<DeleteTodoPayload>) {
      const { listId, id } = action.payload;

      const next = { ...state };
      next[listId].todos = state[listId].todos.filter(
        (td: Todo) => td.id !== id
      );
      state = next;
    },
    updateTodo(state, action: PayloadAction<UpdateTodoPayload>) {
      const { listId, todoPatch } = action.payload;
      const next = { ...state };
      const todoIdxToUpdate = state[listId].todos.slice().indexOf((td: any) => {
        return td.id == todoPatch?.id;
      });
      const newList = merge(todoPatch, next[listId].todos[todoIdxToUpdate]);
      console.log("newList :>> ", newList);
      debugger;
      next[listId].todos.todoIdxToUpdate = newList;
      console.log("next :>> ", next);
      state = next;
    },
  },
});

export default todoSlice.reducer;
