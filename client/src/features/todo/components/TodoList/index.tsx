import React, { useState } from "react";

import { TodoList, Todo } from "../../types";
import { index as TodoItem } from "../TodoItem";
import { Footer } from "./Footer";

import { store } from "app/store";
import { useAppDispatch } from "app/hooks";
import { deleteTodo } from "../../actions";

interface indexProps {
  list: TodoList;
}

const index: React.FC<indexProps> = ({ list: { todos, id: listId } }) => {
  const [currentList, setCurrentList] = useState<TodoList>({
    id: listId,
    todos,
  });
  const dispatch = useAppDispatch();
  const handleDestroy = (e: any) => {
    const tdId = e.target.dataset.todo_id;
    const deleteAction = deleteTodo({
      listId,
      id: tdId,
    });
    dispatch(deleteAction);
    debugger;
    setCurrentList({
      id: listId,
      todos: todos.filter((td: any) => td.id !== tdId),
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
