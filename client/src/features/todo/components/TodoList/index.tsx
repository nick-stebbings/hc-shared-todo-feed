import React, { useState } from "react";

import { TodoList, Todo } from "../../types";
import { index as TodoItem } from "../TodoItem";
import { Footer } from "./Footer";

import { store } from "app/store";
import { useAppDispatch } from "app/hooks";
import { deleteTodo, updateTodo } from "../../actions";

interface indexProps {
  list: TodoList;
}

const index: React.FC<indexProps> = ({ list: { todos, id: listId } }) => {
  const [currentList, setCurrentList] = useState<TodoList>({
    id: listId,
    todos,
  });

  const dispatch = useAppDispatch();

  const handleToggle = (e: any) => {
    const newValue = e.target.checked;
    const id = e.target.parentNode.parentNode.dataset.todo_id;
    const todoPatch = { id, status: newValue };
    store.dispatch(updateTodo({ listId, todoPatch }));
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

  return (
    <div>
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
        count={currentList.todos.filter((td: Todo) => td.status).length}
      />
    </div>
  );
};

export default index;
