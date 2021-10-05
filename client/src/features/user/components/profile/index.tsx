import React, { useEffect, useState } from "react";
import appWsClient from "../../../../hcWebSockets";
import { ProfilesService } from "../../services/userProfile";
import { Profile as ProfileType } from "../../types";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { ProfileUsername } from "./ProfileUsername";

export const Profile: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  const [myprofile, setMyprofile] = useState({});

  useEffect(() => {
    async function connect() {
      const client = await appWsClient();
      const profilesService = new ProfilesService(client);

      const testProfile: ProfileType = {
        nickname: "Nick",
        fields: { age: "33" },
      };
      profilesService
        .createProfile(testProfile)
        .then((r) => console.log("Results:", r));
    }
    connect().then(() => console.log("Connected"));
  }, []);

  return (
    <>
      <ProfileUsername></ProfileUsername>
    </>
  );
};
