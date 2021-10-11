import React, { useState } from "react";

import { useAppDispatch } from "@app/hooks";
import { store } from "@app/store";

import { Profile as ProfileType } from "../../types";
import { createProfile } from "../../actions";
import { ProfileCard } from "./ProfileCard";
import { OtherProfiles } from "./OtherProfiles";

export const Profiles: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  const [userProfile, setUserProfile] = useState<ProfileType>(
    store.getState()?.user
  );
  const [otherUserProfiles, setOtherUserProfiles] = useState<[ProfileType]>([]
  );
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    if (userProfile?.nickname === "") return setIsValidForm(false);

    const cellIdString = store.getState()?.cell?.cellIdString;

    dispatch(
      createProfile(
        cellIdString,
        userProfile?.nickname,
        userProfile?.fields?.avatar
      )
    );
  };

  return (
    <>
      <ProfileCard
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        handleSubmit={handleCreateUser}
      />
      {isLoading ? <OtherProfiles>{otherUserProfiles}</OtherProfiles> : <p>Loading...</p>}
    </>
  );
};
