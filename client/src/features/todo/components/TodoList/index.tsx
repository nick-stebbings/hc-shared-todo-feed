import React from "react";

import { TodoList, Todo } from "../../types";
import { index as TodoItem } from "../TodoItem";
import { Footer } from "./Footer.tsx";

interface indexProps {
  list: TodoList;
}

const index: React.FC<indexProps> = ({ list: { todos } }) => {
  return (
    <div>
      <ul className="todo-list" data-testid="list">
        {todos.map((listItem: Todo) => {
          return <TodoItem key={listItem.id} todo={listItem} />;
        })}
      </ul>
      <Footer count={todos.filter((td: Todo) => td.status).length} />
    </div>
  );
};

export default index;
