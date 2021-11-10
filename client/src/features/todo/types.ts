import {
  AgentPubKeyB64,
  HeaderHashB64,
  EntryHashB64,
} from "@holochain-open-dev/core-types";
import { Dictionary } from "@holochain-open-dev/core-types";

export type Dictionary<T> = { [key: string]: T };
export interface Todo {
  id: string | number;
  description: string;
  status: boolean;
}
export interface TodoList {
  id?: string;
  todos: Todo[];
}
export interface TodoLists extends Dictionary<TodoList> {}

export interface TodoListInfo {
  list: TodoList;
  hash: HeaderHashB64;
  authorPubKey: AgentPubKeyB64;
}
export interface TodoListsInfo {
  lists: Dictionary<TodoList>;
  hash: HeaderHashB64;
  authorPubKey: AgentPubKeyB64;
}
