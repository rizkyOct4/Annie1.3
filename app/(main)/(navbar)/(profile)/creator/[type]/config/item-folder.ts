import { BASE_URL } from "@/_lib/config";

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
    year?: number | null;
    month?: number | null;
    folderName?: any;
  }) => {
    const limit = 8;
    switch (typeConfig) {
      case "listItemFolderPhoto": {
        return `${BASE_URL}/creator/${path}/api-content?key=${typeConfig}&section=${pageParam}&limit=${limit}&year=${year}&month=${month}`;
      }
      case "itemFolderPhoto": {
        return `${BASE_URL}/creator/${path}/api-content?key=${typeConfig}&section=${pageParam}&limit=${limit}&folder-name=${encodeURIComponent(
          folderName
        )}`;
      }
      default:
        return "";
    }
  },
};
