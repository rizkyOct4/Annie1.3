import { BASE_URL } from "@/_lib/config";

export const CONFIG_CUSTOMIZE = {
  GET: ({ typeConfig }: { typeConfig: string }) => {
    switch (typeConfig) {
      case "SSRgetCustomize": {
        return `${BASE_URL}/customize/api`;
      }
      case "CSRgetCustomize": {
        return `/customize/api`;
      }
      default:
        return "";
    }
  },
};
