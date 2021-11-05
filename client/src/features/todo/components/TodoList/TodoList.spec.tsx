import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const MockConductor = require("@holo-host/mock-conductor");
import { mockCallZomeFn, PORT } from "setupTests";
import api from "services/zomeApis";

import { createList, deleteList, updateList } from "features/todo/actions";
import { initialState } from "features/todo/reducer";
import { store } from "app/store";
import { Provider } from "react-redux";

import TodoList from "./index";

type ComponentProps = React.ComponentProps<typeof TodoList>;

// *** Helpers ***
function renderUI(props: ComponentProps) {
  return render(
    <Provider store={store}>
      <TodoList {...props} />
    </Provider>
  );
}
const onlyTodos = (listItems: any) =>
  listItems.filter((li: HTMLElement) => li.dataset?.todo_id).length;

// *** Redux/slice local state ***

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
    expect(count.textContent).toMatch(/1/);
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

  test("it renders a save button", () => {
    const list = {
      id: "1",
      todos: [
        { id: "1", description: "Get milk", status: false },
        { id: "2", description: "Get bread", status: true },
        { id: "3", description: "Pick up mail", status: true },
      ],
    };
    const { getByText } = renderUI({ list });
    const saveButton = getByText(/save/i);

    expect(saveButton).toBeInTheDocument();
    expect(saveButton.nodeName).toBe("BUTTON");
  });

  test("it renders a save button only when the list has items", async () => {
    const list = {
      id: "1",
      todos: [{ id: "101", description: "Get milk", status: false }],
    };
    const { getByText, getByTestId } = renderUI({ list });
    let saveButton = getByText(/save/i);
    expect(saveButton).toBeInTheDocument();

    userEvent.click(getByTestId("delete-101"));

    await waitFor(() => expect(saveButton).not.toBeInTheDocument());
  });

  test("it renders a text input", () => {
    const list = {
      id: "1",
      todos: [{ id: "1", description: "Get milk", status: false }],
    };
    const { getByPlaceholderText } = renderUI({ list });
    const todoInput = getByPlaceholderText("Add a Todo and press enter");

    expect(todoInput).toBeInTheDocument();
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

    test("And the count is incremented", () => {
      let count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/2/);

      userEvent.click(screen.getByTestId("toggle-101"));

      count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/1 /);
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

    test("When I click destroy on the first todo Then it has deleted the first todo", async () => {
      // Check initial state
      let listItems = screen.getAllByRole("listitem");
      expect(onlyTodos(listItems)).toBe(3);

      // Check one item deletion
      waitFor(() => expect(screen.queryByTestId("delete-101")).toBeNull());
      userEvent.click(screen.getByTestId("delete-101"));

      // expect(listItems.length).toBe(2);

      // TODO: Figure out how to update the view with callback
    });

    test("And *just* the first todo was deleted", async () => {
      const deletedItemNode1 = screen.getByTestId("delete-101");

      waitFor(() => expect(screen.queryByTestId("delete-101")).toBeNull());
      userEvent.click(deletedItemNode1);

      expect(screen.getByTestId("delete-102").parentNode).toBeInTheDocument();
      expect(screen.getByTestId("delete-103").parentNode).toBeInTheDocument();
    });

    test("And the count is decremented", () => {
      let count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/2 /);

      userEvent.click(screen.getByTestId("delete-101"));

      count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/1 /);
    });

    test("When I click destroy on the first and third todos Then it has deleted the first and third todos", async () => {
      // Check initial state
      let listItems = screen.getAllByRole("listitem");
      expect(onlyTodos(listItems)).toBe(3);

      const deletedItemNode1 = screen.queryByTestId("delete-101");
      const deletedItemNode3 = screen.queryByTestId("delete-103");

      waitFor(() => expect(deletedItemNode1).toBeNull());
      userEvent.click(screen.getByTestId("delete-101"));
      waitFor(() => expect(deletedItemNode3).toBeNull());
      userEvent.click(screen.getByTestId("delete-103"));

      // expect(listItems.length).toBe(1);
      // TODO: Figure out how to update the view with callback

      expect(screen.getByTestId("delete-102").parentNode).toBeInTheDocument();
    });

    test("And the count is decremented", () => {
      let count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/2 /);

      userEvent.click(screen.getByTestId("delete-101"));
      userEvent.click(screen.getByTestId("delete-103"));

      count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/1 /);
    });

    test("When I click clear (destroy all)  Then it has deleted all todos", async () => {
      // Check initial state
      let listItems = screen.getAllByRole("listitem");
      expect(onlyTodos(listItems)).toBe(3);

      userEvent.click(screen.getByRole("button", { name: /Clear/i }));

      await waitFor(() =>
        expect(screen.queryByTestId("delete-101")).toBeNull()
      );
      await waitFor(() =>
        expect(screen.queryByTestId("delete-102")).toBeNull()
      );
      await waitFor(() =>
        expect(screen.queryByTestId("delete-103")).toBeNull()
      );

      listItems = screen.getAllByRole("listitem");
      await waitFor(() => expect(onlyTodos(listItems)).toBe(0));
    });

    test("And the count is decremented", () => {
      let count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/2 /);

      userEvent.click(screen.getByRole("button", { name: /Clear/i }));

      count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/0 /);
    });
  });
});

describe("it handles adding an item", () => {
  describe("Given a list with 1 todo", () => {
    const list = {
      id: "1",
      todos: [{ id: "101", description: "Get milk", status: false }],
    };

    beforeEach(() => {
      store.dispatch(createList({ list }));
      renderUI({
        list,
      });
    });

    test("When I type a description and click the 'Add Todo' button Then the list shows 2 items", async () => {
      const textBox = screen.getByPlaceholderText("Add a Todo and press enter");

      userEvent.type(textBox, "Get bread{enter}");
      const listItems = screen.getAllByRole("listitem");
      await waitFor(() => expect(onlyTodos(listItems)).toBe(2));
    });

    test("And the 2nd item is the same as what was input", async () => {
      const textBox = screen.getByPlaceholderText("Add a Todo and press enter");

      userEvent.type(textBox, "Get bread{enter}");

      await waitFor(() =>
        expect(screen.getAllByRole("checkbox")).toHaveLength(2)
      );
    });

    test("And the count is incremented", async () => {
      let count = screen.getByRole("heading");
      expect(count.textContent).toMatch(/1 /);
      const textBox = screen.getByPlaceholderText("Add a Todo and press enter");

      userEvent.type(textBox, "Get bread{enter}");
      await waitFor(() => {
        count = screen.getByRole("heading");
        expect(count.textContent).toMatch(/2 /);
      });
    });
    test("And the input is cleared", async () => {
      const textBox = screen.getByPlaceholderText("Add a Todo and press enter");

      userEvent.type(textBox, "Get bread{enter}");

      const newTextBoxVal = screen.getByDisplayValue("");
      await waitFor(() => expect(newTextBoxVal).toBeInTheDocument());
    });
  });
});

describe("it handles filtering", () => {
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

    test("When I click the 'Completed' filter button Then the list shows only item 3", async () => {
      userEvent.click(screen.getByTestId("filter-completed"));
      const listItems = await screen.findAllByRole("listitem");

      expect(onlyTodos(listItems)).toBe(1);
    });

    test("When I click the 'All' filter button Then the list shows 3 items", async () => {
      userEvent.click(screen.getByTestId("filter-all"));
      const listItems = await screen.findAllByRole("listitem");

      expect(onlyTodos(listItems)).toBe(3);
    });

    test("When I click the 'Active' filter button Then the list shows only items 1 and 2", async () => {
      userEvent.click(screen.getByTestId("filter-active"));
      const listItems = await screen.findAllByRole("listitem");

      expect(onlyTodos(listItems)).toBe(2);
    });
  });
});

// ***  Zome calls to store the data on the DHT ***

describe("it handles saving the entire list", () => {
  describe("Given an non-persisted list with 3 todos and a mock zome call service", () => {
    var mockHolochainConductor: any;
    const list = {
      id: "1",
      todos: [
        { id: "101", description: "Get milk", status: false },
        { id: "102", description: "Get bread", status: false },
        { id: "103", description: "Pick up mail", status: true },
      ],
    };

    beforeAll(() => {
      mockHolochainConductor = new MockConductor(PORT);
      api.todofeed["create_todolist"].create = mockCallZomeFn(
        mockHolochainConductor
      );
    });

    beforeEach(() => {
      store.dispatch(createList({ list }));
      renderUI({
        list,
        hasBeenPersisted: false,
      });
    });

    afterEach(() => {
      mockHolochainConductor.clearResponses();
      return mockHolochainConductor.closeApps();
    });

    afterAll(() => mockHolochainConductor.close());

    test("When I click the save button Then it fires a zome function call to add the entry", async () => {
      userEvent.click(screen.getByRole("button", { name: /save/i }));

      expect(api.todofeed.create_todolist.create).toHaveBeenCalledTimes(1); // I.e. an action was created
    });
  });

  describe("Given a persisted list with 3 todos and a mock zome call service", () => {
    var mockHolochainConductor: any;
    const list = {
      id: "1",
      todos: [
        { id: "101", description: "Get milk", status: false },
        { id: "102", description: "Get bread", status: false },
        { id: "103", description: "Pick up mail", status: true },
      ],
    };

    beforeAll(() => {
      mockHolochainConductor = new MockConductor(PORT);
      api.todofeed["update_todolist"].create = mockCallZomeFn(
        mockHolochainConductor
      );
    });

    beforeEach(() => {
      store.dispatch(createList({ list }));
      renderUI({
        list,
        hasBeenPersisted: true,
      });
    });

    afterEach(() => {
      mockHolochainConductor.clearResponses();
      return mockHolochainConductor.closeApps();
    });

    afterAll(() => mockHolochainConductor.close());

    test("When I click the save button Then it fires a zome function call to add an update entry", async () => {
      userEvent.click(screen.getByRole("button", { name: /save/i }));

      expect(api.todofeed.update_todolist.create).toHaveBeenCalledTimes(1); // I.e. an action was created
    });
  });
});
