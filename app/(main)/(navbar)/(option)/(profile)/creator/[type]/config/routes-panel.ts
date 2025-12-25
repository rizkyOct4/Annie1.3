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
    currentPath: string | undefined;
    folderName: string;
    id: string;
  }) => {
    // const limit = 4;
    switch (typeConfig) {
      case "panelDescriptionPhoto": {
        return `/creator/${prevPath}/${currentPath}/api-panel?key=${currentPath}&folder-name=${encodeURIComponent(
          folderName
        )}&id=${id}`;
      }
      default:
        return "";
    }
  },
};
