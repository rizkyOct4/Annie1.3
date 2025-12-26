"use client";

import { Dispatch, SetStateAction } from "react";

export type StateContent = {
  year: string;
  month: string;
};

export type StateFolder = {
  isOpen: boolean;
  isFolder: string;
  isIuProduct: number | null;
};
type MediaType = "photo" | "video";

export type CreatorContextState = {
  // FIRST PATH
  stateContent: StateContent;
  setStateContent: React.Dispatch<React.SetStateAction<StateContent>>;

  stateFolder: StateFolder;
  setStateFolder: React.Dispatch<React.SetStateAction<StateFolder>>;

  updateState: number | null;
  setUpdateState: React.Dispatch<React.SetStateAction<number | null>>;

  isSort: boolean;
  setIsSort: React.Dispatch<React.SetStateAction<boolean>>;

  // SECOND PATH
  pathname: string;
  panel: string | undefined;
  folderName: string;
  idProduct: string;
};

// ! ======================
export type UseCreatorPhotoParams = {
  stateContent: StateContent;
  stateFolder: StateFolder;
  updateState: number | null;
  id: string;
  type: MediaType;
};
export type UseCreatorVideoParams = {
  stateContent: StateContent;
  setStateContent: Dispatch<SetStateAction<StateContent>>;

  stateFolder: StateFolder;
  setStateFolder: Dispatch<SetStateAction<StateFolder>>;

  updateState: number | null;
  setUpdateState: Dispatch<SetStateAction<number | null>>;

  isSort: boolean;
  setIsSort: Dispatch<SetStateAction<boolean>>;

  id: string;
  type: MediaType;
};
export type UseDescriptionParams = {
  id: number;
  panel: string | undefined;
  folderName: string;
  idProduct: string;
  type: "photo";
};
