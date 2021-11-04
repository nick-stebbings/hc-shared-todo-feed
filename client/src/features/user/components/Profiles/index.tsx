import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { store } from "app/store";

import { getRequestStatus } from "features/ui/selectors";
import { Profile as ProfileType, AgentProfile } from "../../types";
import { createProfile, fetchProfiles } from "../../actions";
import { ProfileCard } from "./ProfileCard";
import { OtherProfiles } from "./OtherProfiles";

export const Profiles: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  const cellIdString = store.getState()?.cell?.cellIdString;
  const loadingState = useAppSelector(getRequestStatus);
  const [isValidForm, setIsValidForm] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [userProfile, setUserProfile] = useState<ProfileType>(
    store.getState()?.user?.myProfile
  );
  const [otherUserProfiles, setOtherUserProfiles] = useState<[ProfileType?]>(
    []
  );

  const fetchOtherProfiles = async () => dispatch(fetchProfiles(cellIdString));

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    if (userProfile?.nickname === "" || userProfile?.nickname.length < 3)
      return setIsValidForm(false);

    const cellIdString = store.getState()?.cell?.cellIdString;
    await dispatch(
      createProfile(
        cellIdString,
        userProfile?.nickname,
        userProfile?.fields?.avatar
      )
    );
    setIsSubmitted(true);
  };

  // Set (Profile Card/Profile Form)
  useEffect(() => {
    setUserProfile(store.getState()?.user?.myProfile);
  }, [isSubmitted]);

  // Set (Blank/Other Profiles)
  useEffect(() => {
    // if (cellIdString) {
    //   fetchOtherProfiles().then(() => {
    //     setOtherUserProfiles(store.getState().user?.knownProfiles);
    //   });
    // }
  }, [isSubmitted]);

  return loadingState === "ERROR" ? (
    <p>Error Loading Data</p>
  ) : loadingState === "LOADING" ? (
    <p>Loading...</p>
  ) : (
    <>
      {!isValidForm && <h5>Please enter a name of at least 3 characters.</h5>}
      <ProfileCard
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        handleSubmit={handleCreateUser}
      />
      {/* <OtherProfiles
        children={otherUserProfiles.map(
          ({ agent_pub_key, profile }: AgentProfile) => {
            return (
              <ProfileCard
                key={agent_pub_key}
                userProfile={profile}
              ></ProfileCard>
            );
          }
        )} */}
    </>
  );
};
