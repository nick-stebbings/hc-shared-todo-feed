import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getType } from "typesafe-actions";
import { Todo, TodoList, TodoLists, TodoListInfo, Dictionary } from "./types";
import zomeApis from "services/zomeApis";
import merge from "deepmerge";

export const initialState: Partial<Dictionary<TodoList>> = {
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

export const todoSlice: any = createSlice({
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
      const index: number = state[listId]!.todos.findIndex((todo) => {
        return todo.id == todoPatch.id;
      });
      const next = { ...state };
      const newList = [...(state[listId]?.todos || [])];
      newList[index] = merge.all([
        [...state[listId]!.todos][index] || {},
        todoPatch,
      ]);
      index !== -1 && (next[listId]!.todos = newList);
      state = next;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(zomeApis.todofeed['create_todolist'].success(), (state, action) => {
      state.listDict = 
    });
    builder.addMatcher(zomeApis.todofeed['create_todolist'].failure(), (state) => {
      return state;
    });
    // builder.addMatcher(isLoadingAction, (state) => ({
    //   responseStatus: loadingState,
    // }));
    // builder.addMatcher(isErrorAction, (state) => ({
    //   responseStatus: errorState,
    // }));
    // builder.addDefaultCase((state) => ({
    //   responseStatus: idleState,
    // }));
  },
});

export default todoSlice.reducer;
