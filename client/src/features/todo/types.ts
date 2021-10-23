import { TodoList } from "features/todo/components/TodoList";
export interface Todo {
  id: string | number;
  description: string;
  status: boolean;
}

export interface TodoList {
  id?: string;
  todos: Todo[];
}

export interface TodoLists<TodoList> {
  [key: string]: TodoList;
}
