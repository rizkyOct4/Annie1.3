"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { StateContent, StateFolder } from "./type";

export function useCreatorContextState() {
  // * FIRST PATH
  const [stateContent, setStateContent] = useState<StateContent>({
    year: "",
    month: "",
  });

  const [stateFolder, setStateFolder] = useState<StateFolder>({
    isOpen: false,
    isFolder: "",
    isIuProduct: null,
  });

  const [updateState, setUpdateState] = useState<number | null>(null);
  const [isSort, setIsSort] = useState(false);

  // * SECOND PATH
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const panel = pathname.split("/").filter(Boolean).at(-1);
  const folderName = searchParams.get("folder-name") ?? "";
  const idProduct = searchParams.get("id") ?? "";

  return {
    stateContent,
    setStateContent,

    stateFolder,
    setStateFolder,

    updateState,
    setUpdateState,

    isSort,
    setIsSort,

    // pathname,
    panel,
    folderName,
    idProduct,
  };
}
