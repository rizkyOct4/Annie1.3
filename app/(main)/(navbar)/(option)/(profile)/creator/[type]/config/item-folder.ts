export const ROUTES_ITEM_FOLDER = {
  GET: ({
    typeConfig,
    path,
    pageParam,
    year,
    month,
    folderName,
  }: {
    typeConfig: string;
    path: string;
    pageParam: number;
    year?: string;
    month?: string;
    folderName?: any;
  }) => {
    const limit = 8;
    switch (typeConfig) {
      case "listItemFolderPhoto":
      case "listItemFolderVideo": {
        return `/creator/${path}/api-content?key=${typeConfig}&section=${pageParam}&limit=${limit}&year=${year}&month=${month}`;
      }
      case "itemFolderPhoto":
      case "itemFolderVideo": {
        return `/creator/${path}/api-content?key=${typeConfig}&section=${pageParam}&limit=${limit}&folder-name=${encodeURIComponent(
          folderName
        )}`;
      }
      default:
        return "";
    }
  },
};
