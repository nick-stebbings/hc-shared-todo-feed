import zomeApis, { TodoFeedZomeActionStrings } from "services/zomeApis";

import { TodoList } from "./types";
import { todoSlice } from "./reducer";
const {
  createList,
  deleteList,
  updateList,
  createTodo,
  deleteTodo,
  updateTodo,
} = todoSlice.actions;

const createTodoListZome = (cellIdString: string, list: TodoList) =>
  zomeApis.todofeed[TodoFeedZomeActionStrings["0"]].create({
    cellIdString,
    list,
  });

const fetchTodoListsZome = (cellIdString: string) =>
  zomeApis.todofeed[TodoFeedZomeActionStrings["1"]].create({
    cellIdString,
  });

const updateTodoListZome = (cellIdString: string, list: TodoList) =>
  zomeApis.todofeed[TodoFeedZomeActionStrings["2"]].create({
    cellIdString,
    list,
  });

export {
  TodoFeedZomeActionStrings,
  createList,
  createTodoListZome,
  fetchTodoListsZome,
  deleteList,
  updateList,
  updateTodoListZome,
  createTodo,
  deleteTodo,
  updateTodo,
};
