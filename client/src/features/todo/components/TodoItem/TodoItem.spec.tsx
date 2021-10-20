import React from "react";
import { render } from "@testing-library/react";
import {
  createList,
  createTodo,
  deleteTodo,
  updateTodo,
} from "features/todo/actions";
import { store } from "app/store";

import { index as TodoItem } from "./index";
type ComponentProps = React.ComponentProps<typeof TodoItem>;

// *** Helpers ***
function getTodoByIds(listId: string, todoId: string) {
  return store
    .getState()
    .todo[listId]?.todos?.filter((td: any) => td.id == todoId)[0];
}

function renderUI(props: ComponentProps) {
  return render(<TodoItem {...props} />);
}

// *** Redux/slice state ***

test("it has the default empty list model state", () => {
  store.dispatch(createList({ id: "1" }));
  const listsState = store.getState().todo;

  expect(listsState["1"]?.todos).toEqual([]);
});

test("it adds a new todo", () => {
  store.dispatch(createList({ id: "1" }));
  const todo = { id: "101", description: "Get milk", status: true };
  store.dispatch(createTodo({ listId: "1", todo }));
  const listState = store.getState().todo["1"].todos;

  expect(listState[0]).toEqual(todo);
});

test("it deletes a todo", () => {
  store.dispatch(createList({ id: "1" }));
  const todo = { id: "101", description: "Get milk", status: true };
  store.dispatch(createTodo({ listId: "1", todo }));
  const listState = store.getState().todo["1"].todos;

  store.dispatch(deleteTodo({ listId: "1", id: "101" }));
  const newListState = store.getState().todo["1"].todos;

  expect(newListState.length).toBeLessThan(listState.length);
});

test("it updates a todo by toggling status", () => {
  const todo = { id: "101", description: "Get milk", status: false };
  store.dispatch(createList({ id: "1" }));
  store.dispatch(createTodo({ listId: "1", todo }));
  const todoState = getTodoByIds("1", "101");
  const updatedTodo = { id: "101", description: "Get milk", status: true };

  store.dispatch(
    updateTodo({ listId: "1", todoPatch: { id: "101", status: true } })
  );
  const updatedTodoState = getTodoByIds("1", "101");
  debugger;
  expect(todoState.status).toBe(false);
  expect(updatedTodoState.status).toBe(true);
  expect(updatedTodoState).toEqual(updatedTodo);
});

// *** View ***

describe("it renders <TodoItem>", () => {
  test("it renders a todo item description as a label", () => {
    const todo = { id: "101", description: "Get milk", status: false };
    const { getByText } = renderUI({ todo });
    const textElement = getByText(todo.description);

    expect(textElement).toBeInTheDocument();
    expect(textElement.nodeName).toBe("LABEL");
  });

  test("it renders a checkbox with todo status for todo completion", () => {
    const todo = { id: "101", description: "Get milk", status: false };
    const { getByRole } = renderUI({ todo });
    const checkBox = getByRole("checkbox");

    expect(checkBox).toBeInTheDocument();
    expect(checkBox.checked).toEqual(todo.status);
  });

  test("it renders a button for todo deletion", () => {
    const todo = { id: "101", description: "Get milk", status: false };
    const { getByRole } = renderUI({ todo });
    const deleteButton = getByRole("button");

    expect(deleteButton).toBeInTheDocument();
  });
});
describe("it handles toggling", () => {
  test("it renders a todo item description as a label", () => {
    const todo = { id: "101", description: "Get milk", status: false };
    const { getByText } = renderUI({ todo });
    const textElement = getByText(todo.description);
    expect(textElement).toBeInTheDocument();
    expect(textElement.nodeName).toBe("LABEL");
  });
});
describe("it handles destroying", () => {
  // test("it renders a todo item description as a label", () => {
  //   const todo = { id: "101", description: "Get milk", status: false };
  //   const { getByText } = renderUI({ todo });
  //   const textElement = getByText(todo.description);
  //   expect(textElement).toBeInTheDocument();
  //   expect(textElement.nodeName).toBe("LABEL");
  // });
});
