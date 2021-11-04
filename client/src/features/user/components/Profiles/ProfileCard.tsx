import React from "react";
import { Profile as ProfileType } from "../../types";

type ProfileDetailsProps = {
  children?: React.ReactNode;
  userProfile: ProfileType | null;
  setUserProfile?: (ev: any) => void;
  handleSubmit?: (ev: any) => void;
};

export const ProfileCard: React.FunctionComponent<ProfileDetailsProps> = ({
  children,
  userProfile,
  setUserProfile,
  handleSubmit,
}) => {
  const noUserExists = !userProfile?.fields?.avatar;
  const handleChange = (e: any) => {
    setUserProfile &&
      setUserProfile({ nickname: e.target.value, fields: { avatar: "" } });
  };

  return (
    <div>
      {noUserExists ? (
        <form>
          <label htmlFor="user-nickname">Nickname:</label>
          <input
            id="user-nickname"
            name="user-nickname"
            placeholder="Pick a user nickname"
            value={`${userProfile?.nickname}`}
            onChange={handleChange}
            type="text"
          ></input>
          <button type="submit" onClick={handleSubmit}>
            Register
          </button>
        </form>
      ) : (
        <React.Fragment>
          <img
            alt="User Avatar"
            aria-label="User Avatar"
            src={`data:image/png;base64,${userProfile.fields?.avatar}`}
          ></img>
          <span>{userProfile?.nickname}</span>
        </React.Fragment>
      )}
    </div>
  );
};
