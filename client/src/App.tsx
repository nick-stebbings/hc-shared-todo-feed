import React from "react";

import { useAppDispatch } from "./app/hooks";
import { Profiles } from "features/user/components/Profiles";
import TodoList from "features/todo/components/TodoList";
import { createList } from "features/todo/actions";

interface indexProps {}

export const App: React.FC<indexProps> = ({}) => {
  const dispatch = useAppDispatch();
  const list = {
    id: "1",
    todos: [
      { id: "1", description: "Get milk", status: false },
      { id: "2", description: "Get bread", status: true },
      { id: "3", description: "Pick up mail", status: true },
    ],
  };
  dispatch(createList({ list }));
  return (
    <div className="App">
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <TodoList list={list} />
        <Profiles />
      </div>
    </div>
  );
};
