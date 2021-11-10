import zomeApis, { TodoFeedZomeActionStrings } from "services/zomeApis";

import { TodoList, TodoListInfo, TodoListsInfo, TodoLists } from "./types";
import { todoSlice } from "./reducer";
const {
  createList,
  deleteList,
  updateList,
  createTodo,
  deleteTodo,
  updateTodo,
} = todoSlice.actions;

const createTodoListZome = (
  cellIdString: string,
  list: TodoList
): Promise<TodoListInfo> =>
  zomeApis.todofeed[TodoFeedZomeActionStrings["0"]].create({
    cellIdString,
    payload: { id: list.id, todos: JSON.stringify(list.todos) },
  });

const fetchTodoListsZome = (cellIdString: string): Promise<TodoListsInfo> =>
  zomeApis.todofeed[TodoFeedZomeActionStrings["1"]].create({
    cellIdString,
  });

const updateTodoListZome = (
  cellIdString: string,
  list: TodoList
): Promise<TodoListInfo> =>
  zomeApis.todofeed[TodoFeedZomeActionStrings["2"]].create({
    cellIdString,
    payload: { id: list.id, todos: JSON.stringify(list.todos) },
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
