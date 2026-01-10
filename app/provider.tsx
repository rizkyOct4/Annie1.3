"use client";

import React from "react";
import { profileContext } from "./context";
import { useProfile } from "./hook";

interface ProfileProviderProps {
  children: React.ReactNode;
}

const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const data = useProfile();

  const value = {
    ...data,
  }

  return (
    <profileContext.Provider value={value}>{children}</profileContext.Provider>
  );
};

export default ProfileProvider;
