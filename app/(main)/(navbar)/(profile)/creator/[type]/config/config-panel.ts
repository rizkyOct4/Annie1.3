import { BASE_URL } from "@/_lib/config";

export const ROUTES_CREATOR_PHOTO_PANEL = {
  GET: ({
    typeConfig,
    prevPath,
    currentPath,
    folderName,
    id,
  }: {
    typeConfig: string;
    prevPath: string;
    currentPath: string;
    folderName: string;
    id: string;
  }) => {
    // const limit = 4;
    switch (typeConfig) {
      case "panelDescriptionPhoto": {
        return `${BASE_URL}/creator/${prevPath}/${currentPath}/api-panel?key=${currentPath}&folder-name=${encodeURIComponent(
          folderName
        )}&id=${id}`;
      }
      default:
        return "";
    }
  },
};
