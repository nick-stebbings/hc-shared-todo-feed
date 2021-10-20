export interface Todo {
  id: string | number;
  description: string;
  status: boolean;
}

export interface TodoList {
  todos: Todo[];
}

export interface TodoLists {
  [key: string]: { todos: TodoList };
}
