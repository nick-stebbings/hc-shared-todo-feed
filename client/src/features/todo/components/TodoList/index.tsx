import React, { useState, memo } from "react";

import { index as TodoItem } from "../TodoItem";
import { Footer } from "./Footer";

import { store } from "app/store";
import { useAppDispatch } from "app/hooks";
import { TodoList, Todo } from "../../types";
import { createTodo, deleteTodo, updateTodo, updateList } from "../../actions";

interface indexProps {
  list: TodoList;
}

const index: React.FC<indexProps> = ({ list: { todos, id: listId } }) => {
  const [currentList, setCurrentList] = useState<TodoList>({
    id: listId,
    todos,
  });
  const [newTodo, setNewTodo] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleFilter = (e: any) => {
    switch (e.target.textContent) {
      case "All":
        setCurrentList({
          id: listId,
          todos,
        });
        return;
      case "Active":
        setCurrentList({
          id: listId,
          todos: todos.filter((td) => td.status == false),
        });
        return;
      case "Completed":
        setCurrentList({
          id: listId,
          todos: todos.filter((td) => td.status == true),
        });
        return;
    }
  };

  const handleToggle = (e: any) => {
    const newValue = e.target.checked;
    const id = e.target.parentNode.parentNode.dataset.todo_id;
    const todoPatch = { id, status: newValue };
    store.dispatch(updateTodo({ listId, todoPatch }));
    setCurrentList({
      id: listId,
      todos: store.getState().todo[listId].todos,
    });
  };

  const handleDestroy = (e: any) => {
    const tdId = e.target.parentNode.dataset.todo_id;
    const deleteAction = deleteTodo({
      listId,
      id: tdId,
    });
    dispatch(deleteAction);
    setCurrentList({
      id: listId,
      todos: store.getState().todo[listId].todos,
    });
  };

  const handleDestroyAll = (e: any) => {
    const list = {
      id: listId,
      todos: [],
    };
    const updateAction = updateList({ list });
    dispatch(updateAction);
    setCurrentList({
      id: listId,
      todos: [],
    });
  };

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter") {
      const newTodoItem = {
        id: `${listId}-${Math.floor(Math.random() * todos.length * 1000)}`,
        description: newTodo,
        status: false,
      };
      dispatch(
        createTodo({
          listId,
          todo: newTodoItem,
        })
      );
      setCurrentList({
        id: listId,
        todos: currentList.todos.concat([newTodoItem]),
      });
      // e.target.value = "";
      setNewTodo("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a Todo and press enter"
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        onKeyUp={handleKeyUp}
        value={newTodo}
      />
      <ul className="todo-list" data-testid="list">
        {currentList.todos.map((listItem: Todo) => {
          return (
            <TodoItem
              key={listItem.id}
              todo={listItem}
              handleToggle={handleToggle}
              handleDestroy={handleDestroy}
            />
          );
        })}
      </ul>
      <Footer
        count={
          currentList.todos.length -
          currentList.todos.filter((td: Todo) => td.status).length
        }
        handleFilter={handleFilter}
        handleDestroyAll={handleDestroyAll}
      />
    </div>
  );
};

export default memo(index);
