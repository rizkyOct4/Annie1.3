"use client";

import React, { useContext, useCallback } from "react";
import ModalStats from "./components/modal/modal-stats";
import ItemDescription from "./components/description/id-desc";

import { creatorContext } from "@/app/context";

const ModalPanel = ({ currentPath }: { currentPath: string }) => {
  const { descriptionItemFolderData } = useContext(creatorContext);

  const render = useCallback(() => {
    switch (currentPath) {
      case "stats": {
        return <ModalStats />;
      }
      case "description": {
        return <ItemDescription data={descriptionItemFolderData} />;
      }
    }
  }, [currentPath, descriptionItemFolderData]);

  return <div className="overlay backdrop-blur-sm">{render()}</div>;
};

export default ModalPanel;
