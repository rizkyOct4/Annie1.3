"use client";

import { ReactNode, useContext } from "react";
import { creatorsContext, profileContext } from "@/app/context";
import { useCreators, useCreatorsDescription } from "../hook/hook";

interface CategoryContextProps {
  children: ReactNode;
}

const CreatorsContext: React.FC<CategoryContextProps> = ({ children }) => {
  const { data: getData } = useContext(profileContext);
  const id = getData?.id;
  const username = getData?.username

  const a = useCreators(id)
  const b = useCreatorsDescription(id, username)

  const values = {
    ...a,
    ...b,
  }

  return (
    <creatorsContext.Provider value={values}>
      {children}
    </creatorsContext.Provider>
  );
};

export default CreatorsContext;
