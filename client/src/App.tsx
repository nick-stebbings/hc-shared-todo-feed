import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Profiles } from "features/user/components/Profiles";
import { List } from "../../components/List";
import React from "react";

interface indexProps {}

export const App: React.FC<indexProps> = ({}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <Profiles />
      </header>
    </div>
  );
};
