import React from "react";

interface indexProps {
  todoText: string;
}

export const index: React.FC<indexProps> = ({ todoText }) => {
  return <li>{todoText}</li>;
};
