import React from "react";

interface FooterProps {
  count: number;
  listLength: number;
  handleFilter?: (ev: any, setList: any) => void;
  handleDestroyAll?: (ev: any) => void;
  handleSaveList?: (ev: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  count,
  listLength,
  handleFilter,
  handleDestroyAll,
  handleSaveList,
}) => {
  return (
    <footer>
      <h1 className="todo-count">
        <strong>{count}</strong> {count == 1 ? "item" : "items"} left
      </h1>
      <ul className="filters" onClick={handleFilter}>
        <li data-testid={"filter-all"}>All</li>
        <li data-testid={"filter-active"}>Active</li>
        <li data-testid={"filter-completed"}>Completed</li>
      </ul>

      <button
        name="clear"
        className="clear-completed"
        onClick={handleDestroyAll}
      >
        Clear
      </button>

      {listLength > 0 && (
        <button name="save" className="save-list" onClick={handleSaveList}>
          Save
        </button>
      )}
    </footer>
  );
};
