import React, { useEffect, useState } from "react";
import { ProfileCard } from "./ProfileCard";

import appWsClient from "@/services/hcWebSockets";

import { Profile as ProfileType } from "../../types";
import { gotOlder } from "../../actions";
import { getAge } from "../../selectors";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useSelector } from "react-redux";

export const Profile: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  const age = useAppSelector(getAge);
  const handleClick = () => {
    dispatch(gotOlder());
  };
  return (
    <>
      <ProfileCard name={"nick"} age={age}></ProfileCard>
      <button onClick={handleClick}></button>
    </>
  );
};
