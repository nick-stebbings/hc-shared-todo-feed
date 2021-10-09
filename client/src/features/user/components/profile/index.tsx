import React, { useEffect, useState } from "react";
import { ProfileCard } from "./ProfileCard";

import { useAppDispatch, useAppSelector } from "@app/hooks";

import { getName } from "../../selectors";
import { asyncHoloAction } from "@features/user/actions";

const createUser = asyncHoloAction.create({
  payload: {
    nickname: "alice",
    fields: {
      avatar: "aliceavatar",
    },
  },
  cellIdString:
    "132,45,36,229,179,8,184,119,242,37,46,241,33,205,89,135,233,117,116,51,161,252,246,75,50,234,34,111,226,235,118,152,128,80,149,105,24,18,20[:cell_id_divider:]132,32,36,130,230,134,101,46,201,188,8,241,108,185,214,216,28,176,84,253,101,30,235,181,1,88,84,58,220,232,169,82,212,250,45,206,116,239,96",
});

export const Profile: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  const nickname = useAppSelector(getName);

  const [userProfile, setUserProfile] = useState<any>(null);

  const formHandler = async (e: any) => {
    e.preventDefault();
    dispatch(createUser);
    setUserProfile({ nickname });
    debugger;
  };
  return (
    <>
      <ProfileCard
        nickname={nickname}
        handleSubmit={formHandler}
        setUserProfile={setUserProfile}
      />
    </>
  );
};
