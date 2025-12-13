"use client";

import { customizeContext, profileContext } from "@/app/context";
import { ReactNode, useContext } from "react";
import { useCustomize } from "../hook/use-customize";

interface CustomizeContextProps {
  children: ReactNode;
}

const CustomizeContext: React.FC<CustomizeContextProps> = ({ children }) => {
  const { data: getData } = useContext(profileContext);
  const id = getData?.id;
  const currentPath = "customize"

  const a = useCustomize({ publicId: id, currentPath: currentPath });
  const value = {
    ...a,
  };

  return (
    <customizeContext.Provider value={value}>
      {children}
    </customizeContext.Provider>
  );
};

export default CustomizeContext;
