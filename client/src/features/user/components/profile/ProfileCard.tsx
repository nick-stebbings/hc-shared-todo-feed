import React from "react";

type ProfileDetailsProps = {
  name: any;
  age: any;
  children?: React.ReactNode;
};

export const ProfileCard: React.FunctionComponent<ProfileDetailsProps> = ({
  children,
  name,
  age,
}) => {
  return (
    <p>
      Hello, <em>{name}!</em> You are {age}
    </p>
  );
};
