import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Profiles } from "features/user/components/Profiles";
import TodoList from "features/todo/components/TodoList";
import { createList } from "features/todo/actions";

interface indexProps {}

export const App: React.FC<indexProps> = ({}) => {
  const dispatch = useAppDispatch();
  const storedLists = useAppSelector((state: any) => state.todo);
  const [lists, setLists] = useState(storedLists);
  let [listObj, setListObj] = useState(JSON.stringify(lists));
  useEffect(() => {
    loadTodos().then(() => {
      setLists(storedLists);
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
    setListObj(JSON.stringify(list)); // for useEffect dependency array
  };
  return (
    <div className="App">
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {Object.keys(lists)
          .slice(1) // Skip the default list
          .map((id, i) => (
            <TodoList list={{ id, todos: lists[id].todos }} key={i} />
          ))}
        <Profiles />
      </div>
    </div>
  );
};
