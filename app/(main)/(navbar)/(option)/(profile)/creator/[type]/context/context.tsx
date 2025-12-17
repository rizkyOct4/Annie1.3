"use client";

import { creatorContext } from "@/app/context";
import { profileContext } from "@/app/context";
import { useListFolder, useListItemFolder, useItemDescription, useItemFolder, useCreatorButton } from "../hook/hook-photo";
import { ReactNode, useContext } from "react";
// import { useCreatorVideo } from "./hook/hook-video";

interface CreatorContextProps {
  children: ReactNode;
}

const CreatorContext: React.FC<CreatorContextProps> = ({ children }) => {
  const { data: getData } = useContext(profileContext);
  const id = getData?.id;

  const listFolder = useListFolder(id)
  const listItemFolder = useListItemFolder(id)
  const itemFolder = useItemFolder(id)
  const itemFolderDescription = useItemDescription(id)
  // const photo = useCreatorPhoto(publicId);
  // const video = useCreatorVideo(publicId);
  const z = useCreatorButton(id);

  const value = {
    ...listFolder,
    ...listItemFolder,
    ...itemFolder,
    ...itemFolderDescription,
    // ...photo,
    // ...video,
    ...z,
  };

  return (
    <creatorContext.Provider value={value}>{children}</creatorContext.Provider>
  );
};

export default CreatorContext;
