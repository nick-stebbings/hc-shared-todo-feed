import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Profile } from "@features/user/components/Profile";
import { List } from "../../components/List";
import React from "react";

interface indexProps {}

export const App: React.FC<indexProps> = ({}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <Profile></Profile>
      </header>
    </div>
  );
};
