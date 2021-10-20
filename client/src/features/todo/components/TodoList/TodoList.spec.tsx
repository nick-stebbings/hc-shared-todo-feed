import React from "react";
import { render, screen } from "@testing-library/react";
import { createList, deleteList, updateList } from "features/todo/actions";
import { store } from "app/store";

import { index as TodoList } from "./index";

type ComponentProps = React.ComponentProps<typeof TodoList>;

function renderUI(props: ComponentProps) {
  return render(<TodoList {...props} />);
}

// *** Redux/slice state ***

test("it has the default empty list model state", () => {
  const listsState = store.getState().todo;

  expect(listsState).toBeNull();
});

test("it adds a new list", () => {
  const listsState = store.getState().todo;
  const newList = [
    { id: 1, description: "Get milk", status: true },
    { id: 2, description: "Get bread", status: false },
    { id: 3, description: "Pick up mail", status: true },
  ];
  store.dispatch(createList({ id: "1", list: newList }));
  const newListsState = store.getState().todo;

  expect(newListsState["1"]?.todos).toEqual(newList);
});

test("it deletes a list", () => {
  const newList = [
    { id: 1, description: "Get milk", status: true },
    { id: 2, description: "Get bread", status: false },
    { id: 3, description: "Pick up mail", status: true },
  ];
  store.dispatch(createList({ id: "1", list: newList }));
  const listsState = store.getState().todo;

  store.dispatch(deleteList({ id: "1" }));
  const newListsState = store.getState().todo;

  expect(listsState["1"]).not.toBeUndefined();
  expect(newListsState["1"]).toBeUndefined();
});

test("it updates a list with different statuses", () => {
  const list = [
    { id: 1, description: "Get milk", status: false },
    { id: 2, description: "Get bread", status: true },
    { id: 3, description: "Pick up mail", status: true },
  ];
  const newList = [
    { id: 1, description: "Get milk", status: true },
    { id: 2, description: "Get bread", status: true },
    { id: 3, description: "Pick up mail", status: true },
  ];
  store.dispatch(createList({ id: "1", list }));
  const listsState = store.getState().todo;

  store.dispatch(updateList({ id: "1", list: newList }));
  const updatedListsState = store.getState().todo;

  expect(listsState["1"].todos[0].status).toBe(false);
  expect(updatedListsState["1"].todos[0].status).toBe(true);
});

test("it updates a list with different todos", () => {
  const list = [
    { id: 1, description: "Get milk", status: false },
    { id: 2, description: "Get bread", status: true },
    { id: 3, description: "Pick up mail", status: true },
  ];
  const newList = [
    { id: 4, description: "Get beer", status: true },
    { id: 5, description: "Get a life", status: false },
    { id: 6, description: "Pick up a lady", status: false },
  ];
  store.dispatch(createList({ id: "1", list }));
  const listsState = store.getState().todo;

  store.dispatch(updateList({ id: "1", list: newList }));
  const updatedListsState = store.getState().todo;

  expect(listsState["1"].todos).toEqual(list);
  expect(updatedListsState["1"].todos).toEqual(newList);
});
