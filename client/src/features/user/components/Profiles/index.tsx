import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { store } from "app/store";

import { Profile as ProfileType, AgentProfile } from "../../types";
import { getRequestStatus } from "features/ui/selectors";
import { getStringId } from "features/cell/selectors";
import { createProfileZome, fetchProfilesZome } from "../../actions";

import { ProfileCard } from "./ProfileCard";
import { KnownProfileCards } from "./KnownProfileCards";

export const Profiles: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  const fetchKnownProfiles = async () => dispatch(fetchProfilesZome(cellIdString));

  const cellIdString = useAppSelector(getStringId);
  const loadingState = useAppSelector(getRequestStatus);

  const [isValidForm, setIsValidForm] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [userProfile, setUserProfile] = useState<ProfileType>(
    store.getState()?.user?.myProfile
  );
  const [otherUserProfiles, setOtherUserProfiles] = useState<[ProfileType?]>(
    []
  );

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    if (userProfile?.nickname === "" || userProfile?.nickname.length < 3)
      return setIsValidForm(false);

    const cellIdString = store.getState()?.cell?.cellIdString;
    await dispatch(
      createProfileZome(
        cellIdString,
        userProfile?.nickname,
        userProfile?.fields?.avatar
      )
    );
    setIsValidForm(true);
    setIsSubmitted(true);
  };

  // Set (Profile Card/Profile Form)
  useEffect(() => {
    setUserProfile(store.getState()?.user?.myProfile);
  }, [isSubmitted]);

  // Set (Blank/Other Profiles)
  useEffect(() => {
    if (cellIdString) {
      fetchKnownProfiles().then(() => {
        setOtherUserProfiles(store.getState().user?.knownProfiles);
      });
    }
  }, [isSubmitted]);

  return loadingState === "ERROR" ? (
    <p>Error Loading Data</p>
  ) : loadingState === "LOADING" ? (
    <p>Loading...</p>
  ) : (
    <div className="profile-section">
      <ProfileCard
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        handleSubmit={handleCreateUser}
        isSubmitted={isSubmitted}
        setIsValidForm={setIsValidForm}
      />
      {!isValidForm && <h5>Please enter a name of at least 3 characters.</h5>}
      <hr />
      <KnownProfileCards
        children={otherUserProfiles.map(({ profile }: AgentProfile, idx) => {
          return (
            <ProfileCard
              key={profile.fields.agentPubKey || idx}
              userProfile={profile}
            ></ProfileCard>
          );
        })}
      />
    </div>
  );
};
