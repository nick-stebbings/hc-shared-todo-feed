import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Profiles } from "features/user/components/Profiles";
import TodoList from "features/todo/components/TodoList";
import { createList } from "features/todo/actions";

interface indexProps {}

export const App: React.FC<indexProps> = ({}) => {
  const dispatch = useAppDispatch();
  const storedLists = useAppSelector((state: any) => state.todo);
  const [list, setList] = useState(storedLists);
  const [listObj, setListObj] = useState(JSON.stringify(list));
  useEffect(() => {
    loadTodos().then(() => {
      setList(storedLists);
      debugger;
    });
  }, [listObj]);
  const loadTodos = async () => {
    const list = {
      id: "1",
      todos: [
        { id: "1", description: "Get milk", status: false },
        { id: "2", description: "Get bread", status: true },
        { id: "3", description: "Pick up mail", status: true },
      ],
    };
    dispatch(createList({ list }));
    setListObj(JSON.stringify(list));
  };

  return (
    <div className="App">
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {Object.keys(list)
          .slice(1)
          .map((id, i) => (
            <TodoList list={list[id]} key={i} />
          ))}
        <Profiles />
      </div>
    </div>
  );
};
