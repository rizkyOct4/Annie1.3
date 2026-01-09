export const ROUTES_PROFILE_DESCRIPTION = {
  ACTION: ({ key }: { key: "interest" }) => {
    switch (key) {
      case "interest": {
        return `/api`;
      }
      default:
        return "";
    }
  },
};
