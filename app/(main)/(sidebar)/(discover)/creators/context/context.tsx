"use client";

import { ReactNode, useContext } from "react";
import { creatorsContext, profileContext } from "@/app/context";
import { useCreators, useCreatorsDescription } from "../hook/hook";

interface CategoryContextProps {
  children: ReactNode;
}

const CreatorsContext: React.FC<CategoryContextProps> = ({ children }) => {
  const { profileData } = useContext(profileContext);
  const id = profileData[0]?.id;
  const username = profileData[0]?.username;

  const a = useCreators(id);
  const b = useCreatorsDescription(id, username);

  const value = {
    ...a,
    ...b,
  };

  return (
    <creatorsContext.Provider value={value}>
      {children}
    </creatorsContext.Provider>
  );
};

export default CreatorsContext;
