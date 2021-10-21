import React from "react";
import { Todo } from "../../types";
interface indexProps {
  todo: Todo;
  handleDestroy?: (ev: any) => void;
}

export const index: React.FC<indexProps> = ({ todo, handleDestroy }) => {
  const handleToggle = () => {};

  return (
    <li>
      <label>{todo.description}</label>
      <input
        type="checkbox"
        onChange={handleToggle}
        className="toggle"
        defaultChecked={todo.status}
      />
      <button
        type="button"
        data-todo_id={todo.id}
        onClick={handleDestroy}
        className="destroy"
      />
    </li>
  );
};
