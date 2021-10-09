import React, { useState } from "react";

import { Profile as ProfileType } from "../../types";
type ProfileDetailsProps = {
  nickname?: any;
  avatar?: string;
  children?: React.ReactNode;
  handleSubmit?: (ev: any) => void;
  setUserProfile?: (ev: any) => void;
};

export const ProfileCard: React.FunctionComponent<ProfileDetailsProps> = ({
  children,
  nickname,
  avatar,
  handleSubmit,
  setUserProfile,
}) => {
  const userExists = !!nickname;

  const handleChange = (e: any) => {
    setUserProfile({ nickname: e.target.value });
  };

  return (
    <div>
      {!userExists ? (
        <form>
          <label htmlFor="user-nickname">Nickname:</label>
          <input
            id="user-nickname"
            name="user-nickname"
            placeholder="Pick a user nickname"
            value={nickname || "enter"}
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
            src={`data:image/png;base64,${avatar}`}
          ></img>
          <span>{nickname}</span>
        </React.Fragment>
      )}
    </div>
  );
};
