import { BASE_URL } from "@/_lib/config";

// ! Gunakan encodeURIComponent() agar nama folder dengan spasi atau karakter spesial tidak error (Ex: “My Folder”).
export const ROUTES_PROFILE = {
  // GET: ({
  //   typeConfig,
  //   type,
  //   folderName,
  //   pageParam,
  //   id,
  // }: {
  //   typeConfig: "type" | "folderName" | "id";
  //   type?: string;
  //   folderName?: any;
  //   pageParam?: number;
  //   id?: string | null;
  // }) => {
  //   const limit = 10;
  //   const folderNameLimit = 4;

  //   switch (typeConfig) {
  //     case "type":
  //       return `${BASE_URL}/creator/${type}/api?section=${pageParam}&limit=${limit}`;
  //     case "folderName":
  //       return `${BASE_URL}/creator/${type}/api?folder-name=${encodeURIComponent(
  //         folderName
  //       )}&section=${pageParam}&limit=${folderNameLimit}`;
  //     case "id":
  //       return `${BASE_URL}/creator/${type}/api?folder-name=${encodeURIComponent(
  //         folderName
  //       )}&id=${id}`;
  //     default:
  //       return ""; // ! fallback aman (tidak undefined)
  //   }
  // },
  GET_BTN: ({
    key,
    path,
    typeBtn,
    idProduct,
  }: {
    key: string;
    path?: string;
    typeBtn?: string;
    idProduct?: number | null;
  }) => {
    switch (key) {
      case "photo":
      case "video": {
        return `/creator/${key}/api-general?type-btn=${typeBtn}`;
      }
      case "getUpdate": {
        return `/creator/${path}/api-general?id-product=${idProduct}`;
      }
      default:
        return "";
    }
  },
  // * ======
  ACTION_PHOTO: ({
    method,
    type,
    path,
  }: {
    method: "post" | "put";
    type: "photo";
    path: string;
  }) => {
    switch (method) {
      case "post":
      case "put": {
        return `/creator/${path}/api-content/action?method=${method}&type=${type}`;
      }
      default:
        return "";
    }
  },
  PUT: ({
    key,
    method,
    type,
    path,
  }: {
    key: string;
    method: string;
    type: "photo" | "video";
    path: string;
  }) => {
    switch (key) {
      case "putImage":
      case "videoPost": {
        return `${BASE_URL}/creator/${path}/api/post-button?method=${method}&type=${type}`;
      }
      default:
        return "";
    }
  },
};
