"use client";

import { creatorContext } from "@/app/context";
import { profileContext } from "@/app/context";
import {
  useCreatorPhoto,
  useDescription,
  useCreatorButton,
} from "../hook/hook-photo";
import { ReactNode, useContext } from "react";
import { useCreatorVideo } from "../hook/hook-video";
import { useCreatorContextState } from "./helperCreatorContext";
import { useParams } from "next/navigation";

interface CreatorContextProps {
  children: ReactNode;
}

const CreatorContext: React.FC<CreatorContextProps> = ({ children }) => {
  const { profileData } = useContext(profileContext);
  const id = profileData[0]?.id;
  const { type } = useParams<{ type: string }>();

  // ? HELPER
  const {
    stateContent,
    setStateContent,

    stateFolder,
    setStateFolder,

    updateState,
    setUpdateState,

    isSort,
    setIsSort,

    panel,
    folderName,
    idProduct,
  } = useCreatorContextState();

  // ! DATA
  // ? PHOTO
  const photo = useCreatorPhoto({
    stateContent,
    stateFolder,
    updateState,
    id,
    type: "photo",
  });
  const photoDescription = useDescription({
    id,
    panel,
    folderName,
    idProduct,
    type: "photo",
  });
  const z = useCreatorButton(id);

  // ? VIDEO
  const video = useCreatorVideo({
    stateContent,
    setStateContent,
    stateFolder,
    setStateFolder,
    updateState,
    setUpdateState,
    isSort,
    setIsSort,
    id,
    type: "video",
  });

  const value = {
    ...photo,
    ...photoDescription,
    ...video,
    ...z,
    stateContent,
    setStateContent,

    stateFolder,
    setStateFolder,

    updateState,
    setUpdateState,

    isSort,
    setIsSort,

    panel,
    folderName,
    idProduct,

    type,
  };

  return (
    <creatorContext.Provider value={value}>{children}</creatorContext.Provider>
  );
};

export default CreatorContext;
