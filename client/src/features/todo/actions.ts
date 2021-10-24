import { TodoList } from "./types";
import { todoSlice } from "./reducer";
import { createZomeCallAsyncAction } from "services/redux-middleware";

const {
  createList,
  deleteList,
  updateList,
  createTodo,
  deleteTodo,
  updateTodo,
} = todoSlice.actions;

const createZomeListActionCreator = createZomeCallAsyncAction(
  "instafeed",
  "create_list"
);

const createZomeList = (cellIdString: string, list: TodoList) =>
  createZomeListActionCreator.create({
    cellIdString,
    list,
  });

export {
  createList,
  createZomeList,
  deleteList,
  updateList,
  createTodo,
  deleteTodo,
  updateTodo,
};
