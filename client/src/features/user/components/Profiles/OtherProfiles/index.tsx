import React from "react";
import { List } from "@components/List";

interface OtherProfilesProps {
  children: React.ReactNode;
}

export const OtherProfiles: React.FC<OtherProfilesProps> = ({ children }) => {
  debugger;
  return <List listItems={children}></List>;
};