import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Profiles } from "features/user/components/Profiles";
import TodoList from "features/todo/components/TodoList";
import React from "react";

interface indexProps {}

export const App: React.FC<indexProps> = ({}) => {
  const dispatch = useAppDispatch();
  const list = {
    todos: [
      { id: 1, description: "Get milk", status: false },
      { id: 2, description: "Get bread", status: true },
      { id: 3, description: "Pick up mail", status: true },
    ],
  };
  return (
    <div className="App">
      <header className="App-header">
        <Profiles />
        <TodoList list={list} />
      </header>
    </div>
  );
};
