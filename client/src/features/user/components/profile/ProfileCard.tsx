import React, { useState } from "react";

type ProfileDetailsProps = {
  nickname?: any;
  avatar?: string;
  children?: React.ReactNode;
};

export const ProfileCard: React.FunctionComponent<ProfileDetailsProps> = ({
  children,
  nickname,
  avatar,
}) => {
  const userExists = !!nickname;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.target!.disabled = true;
    e.target!.textContent = "loading";
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
