import React from "react";
import { Todo } from "../../types";

interface indexProps {
  todo: Todo;
}

const handleToggle = () => {};

const handleDestroy = () => {};

export const index: React.FC<indexProps> = ({ todo }) => {
  return (
    <li>
      <label>{todo.description}</label>
      <input
        type="checkbox"
        onChange={handleToggle}
        className="toggle"
        defaultChecked={todo.status}
      />
      <button type="button" onClick={handleDestroy} className="destroy" />
    </li>
  );
};
