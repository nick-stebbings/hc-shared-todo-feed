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

console.log("TodoFeedZomeActionStrings :>> ", TodoFeedZomeActionStrings);
console.log("TodoFeedZomeActionStrings :>> ", TodoFeedZomeActionStrings["0"]);
console.log("zomeApis :>> ", zomeApis);
const createTodoListZome = (cellIdString: string, list: TodoList) =>
  zomeApis.todofeed[TodoFeedZomeActionStrings["0"]].create({
    cellIdString,
    list,
  });

const updateTodoListZome = (cellIdString: string, list: TodoList) =>
  zomeApis.todofeed[TodoFeedZomeActionStrings["1"]].create({
    cellIdString,
    list,
  });

export {
  TodoFeedZomeActionStrings,
  createList,
  createTodoListZome,
  deleteList,
  updateList,
  updateTodoListZome,
  createTodo,
  deleteTodo,
  updateTodo,
};
