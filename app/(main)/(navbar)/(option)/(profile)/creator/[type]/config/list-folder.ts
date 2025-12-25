
export const ROUTES_LIST_FOLDER = {
  GET: ({
    typeConfig,
    path,
    pageParam,
  }: {
    typeConfig: string;
    path: string;
    pageParam: number;
  }) => {
    const limit = 4;
    switch (typeConfig) {
      case "listFolderPhoto": {
        return `/creator/${path}/api-list?section=${pageParam}&limit=${limit}`;
      }
      case "listFolderVideo": {
        return `/creator/${path}/api-list?section=${pageParam}&limit=${limit}`;
      }
      default:
        return "";
    }
  },
};
