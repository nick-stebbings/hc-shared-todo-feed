import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoList, TodoLists } from "./types";
import merge from "deepmerge";

export const initialState: Partial<TodoLists<TodoList>> = {
  "0": { id: "0", todos: [] },
};

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
      const { todos, id } = action.payload.list;
      return {
        ...state,
        [String(id)]: { todos: todos || [] },
      };
    },
    deleteList(state, action: PayloadAction<DeleteListPayload>) {
      delete state[action.payload.id];
    },
    updateList(state, action: PayloadAction<NewListPayload>) {
      const { todos, id } = action.payload.list;
      return {
        ...state,
        [String(id)]: { todos },
      };
    },
    createTodo(state, action: PayloadAction<NewTodoPayload>) {
      const { listId, todo } = action.payload;
      if (state[listId]?.todos) {
        state[String(listId)]!.todos?.push(todo);
      } else {
        state[String(listId)]!.todos = [todo];
      }
    },
    deleteTodo(state, action: PayloadAction<DeleteTodoPayload>) {
      const { listId, id } = action.payload;

      const next = { ...state };
      next[listId]!.todos = state[listId]!.todos.filter(
        (td: Todo) => td.id !== id
      );
      state = next;
    },
    updateTodo(state, action: PayloadAction<UpdateTodoPayload>) {
      const { listId, todoPatch } = action.payload;

      const index =
        state[listId] &&
        state[listId].todos.findIndex((todo) => {
          return todo.id == todoPatch.id;
        });
      const next = { ...state };
      const newList = [...(state[listId]?.todos || [])];
      newList[index] = merge.all([
        [...state[listId].todos][index] || {},
        todoPatch,
      ]);
      index && (next[listId].todos = newList);
      debugger;
      state = next;
    },
  },
});

export default todoSlice.reducer;
