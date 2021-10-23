import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createList, deleteList, updateList } from "features/todo/actions";
import { initialState } from "features/todo/reducer";
import { store } from "app/store";
import { Provider } from "react-redux";

import TodoList from "./index";

type ComponentProps = React.ComponentProps<typeof TodoList>;

function renderUI(props: ComponentProps) {
  return render(
    <Provider store={store}>
      <TodoList {...props} />
    </Provider>
  );
}

// *** Redux/slice state ***

test("it has the default empty lists model state", () => {
  const listsState = store.getState().todo;

  expect(listsState).toEqual(initialState);
});

test("it adds a new default list", () => {
  store.dispatch(createList({ list: { id: "1" } }));
  const newListsState = store.getState().todo;

  expect(newListsState["1"]?.todos).toHaveLength(0);
});

test("it adds a new list", () => {
  const listsState = store.getState().todo;
  const newList = [
    { id: "1", description: "Get milk", status: true },
    { id: "2", description: "Get bread", status: false },
    { id: "3", description: "Pick up mail", status: true },
  ];
  store.dispatch(createList({ list: { id: "1", todos: newList } }));
  const newListsState = store.getState().todo;

  expect(newListsState["1"]?.todos).toEqual(newList);
});

test("it deletes a list", () => {
  const newList = [
    { id: "1", description: "Get milk", status: true },
    { id: "2", description: "Get bread", status: false },
    { id: "3", description: "Pick up mail", status: true },
  ];
  store.dispatch(createList({ list: { id: "1", todos: newList } }));
  const listsState = store.getState().todo;

  store.dispatch(deleteList({ id: "1" }));
  const newListsState = store.getState().todo;

  expect(listsState["1"]).not.toBeUndefined();
  expect(newListsState["1"]).toBeUndefined();
});

test("it updates a list with different statuses", () => {
  const list = [
    { id: "1", description: "Get milk", status: false },
    { id: "2", description: "Get bread", status: true },
    { id: "3", description: "Pick up mail", status: true },
  ];
  const newList = [
    { id: "1", description: "Get milk", status: true },
    { id: "2", description: "Get bread", status: true },
    { id: "3", description: "Pick up mail", status: false },
  ];
  store.dispatch(createList({ list: { id: "1", todos: list } }));
  const listsState = store.getState().todo;

  store.dispatch(updateList({ list: { id: "1", todos: newList } }));
  const updatedListsState = store.getState().todo;

  expect(listsState["1"].todos[0].status).toBe(false);
  expect(updatedListsState["1"].todos[0].status).toBe(true);
  expect(listsState["1"].todos[2].status).toBe(true);
  expect(updatedListsState["1"].todos[2].status).toBe(false);
});

test("it updates a list with different todos", () => {
  const list = [
    { id: "1", description: "Get milk", status: false },
    { id: "2", description: "Get bread", status: true },
    { id: "3", description: "Pick up mail", status: true },
  ];
  const newList = [
    { id: "4", description: "Get beer", status: true },
    { id: "5", description: "Get a life", status: false },
    { id: "6", description: "Pick up a lady", status: false },
  ];
  store.dispatch(createList({ list: { id: "1", todos: list } }));
  const listsState = store.getState().todo;

  store.dispatch(updateList({ list: { id: "1", todos: newList } }));
  const updatedListsState = store.getState().todo;

  expect(listsState["1"].todos).toEqual(list);
  expect(updatedListsState["1"].todos).toEqual(newList);
});

// *** View ***

describe("it renders <TodoList>", () => {
  test("it renders a todo list with 3 todo items", () => {
    const list = {
      id: "1",
      todos: [
        { id: "1", description: "Get milk", status: false },
        { id: "2", description: "Get bread", status: true },
        { id: "3", description: "Pick up mail", status: true },
      ],
    };
    const { getByText, getByTestId } = renderUI({ list });
    const textElement = getByText(list.todos[0].description);
    const textElement1 = getByText(list.todos[1].description);
    const textElement2 = getByText(list.todos[2].description);
    const ul = getByTestId("list");

    expect(ul).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(textElement1).toBeInTheDocument();
    expect(textElement2).toBeInTheDocument();
  });

  test("it renders a todo list with 1 unchecked, 2 checked todos", () => {
    const list = {
      id: "1",
      todos: [
        { id: "1", description: "Get milk", status: false },
        { id: "2", description: "Get bread", status: true },
        { id: "3", description: "Pick up mail", status: true },
      ],
    };
    const { getAllByRole } = renderUI({ list });
    const unchecked = getAllByRole("checkbox", { checked: false });
    const checked = getAllByRole("checkbox", { checked: true });

    expect(unchecked.length).toBe(1);
    expect(checked.length).toBe(2);
  });

  test("it renders a footer with filters for completed, uncompleted, active", () => {
    const list = {
      id: "1",
      todos: [
        { id: "1", description: "Get milk", status: false },
        { id: "2", description: "Get bread", status: true },
        { id: "3", description: "Pick up mail", status: true },
      ],
    };
    const { getByRole, getByText } = renderUI({ list });
    const footer = getByRole("contentinfo");
    const filter = getByText("All");
    const filter1 = getByText("Active");
    const filter2 = getByText("Completed");

    expect(footer).toBeInTheDocument();
    expect(filter).toBeInTheDocument();
    expect(filter1).toBeInTheDocument();
    expect(filter2).toBeInTheDocument();
  });

  test("it renders a completed count", () => {
    const list = {
      id: "1",
      todos: [
        { id: "1", description: "Get milk", status: false },
        { id: "2", description: "Get bread", status: true },
        { id: "3", description: "Pick up mail", status: true },
      ],
    };
    const { getByRole } = renderUI({ list });
    const count = getByRole("heading");

    expect(count).toBeInTheDocument();
    expect(count.textContent).toMatch(/2/);
  });

  test("it renders a clear button", () => {
    const list = {
      id: "1",
      todos: [
        { id: "1", description: "Get milk", status: false },
        { id: "2", description: "Get bread", status: true },
        { id: "3", description: "Pick up mail", status: true },
      ],
    };
    const { getByText } = renderUI({ list });
    const clearButton = getByText("Clear");

    expect(clearButton).toBeInTheDocument();
    expect(clearButton.nodeName).toBe("BUTTON");
  });
});

describe("it handles toggling", () => {
  describe("Given a list with a completed todo and two uncompleted todos", () => {
    const list = {
      id: "1",
      todos: [
        { id: "101", description: "Get milk", status: false },
        { id: "102", description: "Get bread", status: false },
        { id: "103", description: "Pick up mail", status: true },
      ],
    };

    beforeEach(() => {
      store.dispatch(createList({ list }));
      renderUI({
        list,
      });
    });

    test("When I click toggle on the first todo Then it has changed the view to 'incomplete' for *just* the first todo", () => {
      let unchecked = screen.getAllByRole("checkbox", { checked: false });
      let checked = screen.getAllByRole("checkbox", { checked: true });
      expect(unchecked.length).toBe(2);
      expect(checked.length).toBe(1);

      userEvent.click(screen.getByTestId("toggle-101"));

      unchecked = screen.getAllByRole("checkbox", { checked: false });
      checked = screen.getAllByRole("checkbox", { checked: true });

      expect(unchecked.length).toBe(1);
      expect(checked.length).toBe(2);
    });

    test("and the count is incremented", () => {
      let count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/1/);

      userEvent.click(screen.getByTestId("toggle-101"));

      count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/ 2 /);
    });
  });
});

describe("it handles destroying", () => {
  describe("Given a list with 3 todos", () => {
    const list = {
      id: "1",
      todos: [
        { id: "101", description: "Get milk", status: false },
        { id: "102", description: "Get bread", status: false },
        { id: "103", description: "Pick up mail", status: true },
      ],
    };

    beforeEach(() => {
      store.dispatch(createList({ list }));
      renderUI({
        list,
      });
    });

    test("When I click destroy on the first todo Then it has deleted the first todo and *just* the first todo", async () => {
      let listItems = screen
        .getAllByRole("listitem")
        .filter((li) => li.dataset?.todo_id);
      expect(listItems.length).toBe(3);

      const deletedItem = screen.getByTestId("delete-101");
      await waitForElementToBeRemoved(deletedItem);
      userEvent.click(screen.getByTestId("delete-101"));
      listItems = screen.getAllByRole("listitem").filter((li) => {
        return li.dataset?.todo_id;
      });

      expect(listItems.length).toBe(2);

      expect(screen.getByTestId("delete-102").parentNode).toBeInTheDocument();
      expect(screen.getByTestId("delete-103").parentNode).toBeInTheDocument();
    });
  });
});
