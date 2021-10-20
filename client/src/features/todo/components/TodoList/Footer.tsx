import React from "react";

interface FooterProps {
  count: number;
}

export const Footer: React.FC<FooterProps> = ({ count }) => {
  return (
    <footer>
      <h1 class="todo-count">
        <strong>{count}</strong> {count == 1 ? "item" : "items"} left
      </h1>
      <ul className="filters">
        <li>All</li>
        <li>Active</li>
        <li>Completed</li>
      </ul>

      <button className="clear-completed">Clear</button>
    </footer>
  );
};
