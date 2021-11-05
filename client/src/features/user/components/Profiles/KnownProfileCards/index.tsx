import React from "react";
import { List } from "components/List";

interface KnownProfileCardsProps {
  children: React.ReactNode;
}

export const KnownProfileCards: React.FC<KnownProfileCardsProps> = ({
  children,
}) => {
  return <List listItems={children}></List>;
};
