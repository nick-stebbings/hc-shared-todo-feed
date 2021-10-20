import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { store } from "app/store";

import { getRequestStatus } from "@features/ui/selectors";
import { Profile as ProfileType, AgentProfile } from "../../types";
import { createProfile, fetchProfiles } from "../../actions";
import { ProfileCard } from "./ProfileCard";
import { OtherProfiles } from "./OtherProfiles";

export const Profiles: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(getRequestStatus);
  const [userProfile, setUserProfile] = useState<ProfileType>(
    store.getState()?.user?.myProfile
  );
  const [otherUserProfiles, setOtherUserProfiles] = useState<[ProfileType?]>(
    []
  );
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    if (userProfile?.nickname === "") return setIsValidForm(false);
    dispatch(
      createProfile(
        cellIdString,
        userProfile?.nickname,
        userProfile?.fields?.avatar
      )
    );
  };
  const fetchOtherProfiles = async () => dispatch(fetchProfiles(cellIdString));

  let cellIdString = store.getState()?.cell?.cellIdString;

  useEffect(async () => {
    if (cellIdString) {
      await fetchOtherProfiles();
      setOtherUserProfiles(store.getState().user?.knownProfiles);
    }
  }, [userProfile]);

  return loadingState === "ERROR" ? (
    <p>Error Loading Data</p>
  ) : loadingState === "LOADING" ? (
    <p>Loading...</p>
  ) : (
    <>
      <ProfileCard
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        handleSubmit={handleCreateUser}
      />
      <OtherProfiles
        children={otherUserProfiles.map(
          ({ agent_pub_key, profile }: AgentProfile) => {
            return (
              <ProfileCard
                key={agent_pub_key}
                userProfile={profile}
              ></ProfileCard>
            );
          }
        )}
      />
    </>
  );
};
