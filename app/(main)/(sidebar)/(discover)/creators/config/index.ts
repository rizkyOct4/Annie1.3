import { BASE_URL } from "@/_lib/config";

export const ROUTES_CREATORS = {
  GET: ({
    typeConfig,
    pageParams,
    targetId,
  }: {
    typeConfig: string;
    pageParams?: number;
    targetId?: string;
  }) => {
    const limit = 10;
    switch (typeConfig) {
      case "creators":
        return `/creators/api?section=${pageParams}&limit=${limit}`;
      case "creatorsDescription":
        return `/creators/${targetId}/api`;
      case "listCreatorsProduct":
        return `/creators/${targetId}/api?section=${pageParams}&limit=${limit}`;
      default:
        return "";
    }
  },

  POST: ({ key, params }: { key: "likePost"; params: string }) => {
    switch (key) {
      case "likePost":
        return `/creators/${params}/api?action=post`;
      default:
        return "";
    }
  },
};
