export const ROUTES_CREATORS: any = {
  GET: ({
    typeConfig,
    pageParams,
    targetId,
    key,
  }: {
    typeConfig: string;
    pageParams?: number;
    targetId?: string;
    key?: "photo" | "video" | "music";
  }) => {
    const limit = 10;
    switch (typeConfig) {
      case "creators":
        return `/creators/api?section=${pageParams}&limit=${limit}`;
      case "creatorsDescription":
        return `/creators/${targetId}/api`;
      case "listCreatorsProduct":
      case "listCreatorsProductVideo":
        return `/creators/${targetId}/api?key=${key}&section=${pageParams}&limit=${limit}`;
      default:
        return "";
    }
  },
  GET_ACTION: ({
    pageParams,
    targetId,
    key,
    idProduct,
    idSubComment,
  }: {
    pageParams?: number;
    targetId?: string;
    key: "comment" | "sub_comment";
    idProduct?: number;
    idSubComment?: number;
  }) => {
    const limit = 10;
    switch (key) {
      case "comment":
        return `/creators/${targetId}/api/get-action?key=${key}&id-product=${idProduct}&section=${pageParams}&limit=${limit}`;
      case "sub_comment":
        return `/creators/${targetId}/api/get-action?key=${key}&id-sub-comment=${idSubComment}&section=${pageParams}&limit=${limit}`;
      default:
        return "";
    }
  },
  // ! ACTIONS ============================
  POST: ({
    key,
    params,
  }: {
    key: "like" | "follow" | "bookmark" | "email" | "comment";
    params: string;
  }) => {
    switch (key) {
      case "like":
        return `/creators/${params}/api?key=${key}&action=post`;
      case "follow":
        return `/creators/${params}/api?key=${key}&action=post`;
      case "bookmark":
        return `/creators/${params}/api?key=${key}&action=post`;
      case "email":
        return `/creators/${params}/api?key=${key}&action=post`;
      case "comment":
        return `/creators/${params}/api?key=${key}&action=post`;
      default:
        return "";
    }
  },
};
