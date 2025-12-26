"use client";

import { useContext } from "react";
import { creatorContext } from "@/app/context";
import dynamic from "next/dynamic";

const LazyListListItem = dynamic(() => import("./list-item-folder"));

export default function ModalListItem({
  currentPath,
}: {
  currentPath: string;
}) {
  const { listItemFolderPhotoData, listItemFolderVideoData } =
    useContext(creatorContext);

  switch (currentPath) {
    case "photo":
    case "video":
      return (
        <LazyListListItem
          data={
            currentPath === "photo"
              ? listItemFolderPhotoData
              : listItemFolderVideoData
          }
          currentPath={currentPath}
        />
      );
    default:
      return;
  }
}
