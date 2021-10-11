import React, { useState } from "react";
import { Profile as ProfileType } from "../../types";
import { createUser } from "../../actions";
import { ProfileCard } from "./ProfileCard";

import { useAppDispatch } from "@app/hooks";
import { store } from "@app/store";

export const Profile: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  const [userProfile, setUserProfile] = useState<ProfileType>(
    store.getState()?.user
  );
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    if (userProfile?.nickname === "") return setIsValidForm(false);

    const cellIdString = store.getState()?.cell?.cellIdString;

    dispatch(
      createUser(
        cellIdString,
        userProfile?.nickname,
        userProfile?.fields?.avatar
      )
    );
  };

  return (
    <React.Fragment>
      <ProfileCard
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        handleSubmit={handleCreateUser}
      />
    </React.Fragment>
  );
};
