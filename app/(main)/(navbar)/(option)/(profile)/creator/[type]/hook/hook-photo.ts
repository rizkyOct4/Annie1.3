"use client";

import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { ROUTES_PROFILE } from "../config";
import { usePost } from "./sub/use-sub-photo";
import { ROUTES_LIST_FOLDER } from "../config/list-folder";
import { ROUTES_ITEM_FOLDER } from "../config/item-folder";
import { ROUTES_CREATOR_PHOTO_PANEL } from "../config/routes-panel";

// * LIST FOLDER ====
const useListFolder = (id: string) => {
  const { type } = useParams<{ type: string }>();

  const {
    data: listFolderPhoto,
    fetchNextPage: FNPListFolderPhoto,
    hasNextPage: HNPListFolderPhoto,
    isFetchingNextPage: IFNPListFolderPhoto,
  } = useInfiniteQuery({
    queryKey: ["keyListFolderPhoto", id, type],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        ROUTES_LIST_FOLDER.GET({
          typeConfig: "listFolderPhoto",
          path: type,
          pageParam: pageParam,
        })
      );
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 60,
    initialPageParam: 1,
    enabled: !!type,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  const listFolderData = useMemo(
    () => listFolderPhoto?.pages.flatMap((page) => page?.data ?? []),
    [listFolderPhoto?.pages]
  );

  // console.log(listFolderData)

  return {
    // * LIST FOLDER PHOTO
    listFolderData,
    FNPListFolderPhoto,
    HNPListFolderPhoto,
    IFNPListFolderPhoto,
  };
};

// * CONTENT ====
const useListItemFolder = (id: string) => {
  const { type } = useParams<{ type: string }>();
  const [stateContent, setStateContent] = useState({
    year: "",
    month: "",
  });

  // * List Item Folder
  const { data: listItemFolder } = useInfiniteQuery({
    queryKey: ["keyListItemFolder", id, stateContent.year, stateContent.month],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_ITEM_FOLDER.GET({
        typeConfig: "listItemFolderPhoto",
        path: type,
        pageParam: pageParam,
        year: stateContent.year,
        month: stateContent.month,
      });
      const { data } = await axios.get(URL);
      return data;
    },

    // ? ketika melakukan fetchNextPage maka akan memanggil queryFn kembali
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 60,
    initialPageParam: 1,
    enabled: !!stateContent.year && !!stateContent.month,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  const listItemFolderPhotoData = useMemo(
    () => listItemFolder?.pages.flatMap((page) => page.data) ?? [],
    [listItemFolder?.pages]
  );

  const { postPhoto } = usePost({
    keyListFolder: [
      "keyListItemFolder",
      id,
      stateContent?.year,
      stateContent?.month,
    ],
    keyItemFolder: [],
    type: type,
  });

  // console.log(listItemFolderPhotoData)

  return {
    // ? STATE
    setStateContent,

    // ? DATA
    listItemFolderPhotoData,
  };
};

const useItemFolder = (id: string) => {
  const { type } = useParams<{ type: string }>();
  const [stateFolder, setStateFolder] = useState({
    isOpen: false,
    isFolder: "",
    isIuProduct: null,
  });

  const {
    data: itemFolderPhoto,
    isLoading: isLoadingItemFolderPhoto,
    fetchNextPage: fetchNextPageItemFolder,
    hasNextPage: isHasPageItemFolder,
    isFetchingNextPage: isFetchingNextPageItemFolder,
  } = useInfiniteQuery({
    queryKey: ["keyItemFolderPhoto", id, stateFolder.isFolder],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_ITEM_FOLDER.GET({
        typeConfig: "itemFolderPhoto",
        path: type,
        pageParam: pageParam,
        folderName: stateFolder.isFolder,
      });
      const { data } = await axios.get(URL);
      return data;
    },

    // ? ketika melakukan fetchNextPage maka akan memanggil queryFn kembali
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 60,
    initialPageParam: 1,
    enabled: !!stateFolder.isFolder,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  const itemFolderPhotoData = useMemo(
    () => itemFolderPhoto?.pages.flatMap((page) => page.data) ?? [],
    [itemFolderPhoto?.pages]
  );

  const { postPhoto } = usePost({
    keyListFolder: [],
    keyItemFolder: ["keyItemFolderPhoto", id, stateFolder.isFolder],
    type: type,
  });

  // console.log(itemFolderPhotoData)

  return {
    // ? STATE
    stateFolder,
    setStateFolder,

    // ? DATA
    itemFolderPhotoData,
    isLoadingItemFolderPhoto,
    fetchNextPageItemFolder,
    isHasPageItemFolder,
    isFetchingNextPageItemFolder,

    postPhoto,
  };
};

const useItemDescription = (id: string) => {
  const { type, panel } = useParams<{ type: string; panel: string }>();
  const folderName = useSearchParams().get("folder-name") ?? "";
  const idDesc = useSearchParams().get("id") ?? "";

  const { data: descriptionItemFolderPhoto } = useQuery({
    queryKey: ["keyDescriptionItemFolder", id, panel, folderName, idDesc],
    queryFn: async () => {
      const URL = ROUTES_CREATOR_PHOTO_PANEL.GET({
        typeConfig: "panelDescriptionPhoto",
        prevPath: type,
        currentPath: panel,
        folderName: folderName,
        id: idDesc,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!panel && !!idDesc,
    gcTime: 1000 * 60 * 60, // Cache data akan disimpan selama 1 jam
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false,
    retry: false,
  });
  const descriptionItemFolderData: TItemFolderDescription[] = useMemo(
    () => descriptionItemFolderPhoto ?? [],
    [descriptionItemFolderPhoto]
  );

  return { descriptionItemFolderData };
};

// ? ===============
const useCreatorButton = (id: string) => {
  const [typeBtn, setTypeBtn] = useState<string>("");

  // * LIST POST FOLDER
  const { data: listPostFolder, isLoading: isLoadingListPost } = useQuery({
    queryKey: ["listFolderPost", id, typeBtn],
    queryFn: async () => {
      const URL = ROUTES_PROFILE.GET_BTN({ key: typeBtn, typeBtn: typeBtn });
      const { data } = await axios.get(URL);
      return data;
    },
    enabled: typeBtn !== "",
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  const ListPostFolderData = useMemo(
    () => listPostFolder ?? [],
    [listPostFolder]
  );

  // console.log(ListPostFolderData);

  return {
    listPostFolder,
    isLoadingListPost,
    ListPostFolderData,
    setTypeBtn,

    // ? updateDataPhoto
    // UpdatePhotoData,
    // setIuProduct,
    // isLoadingUpdatePhoto,
  };
};

export {
  useListFolder,
  useListItemFolder,
  useItemFolder,
  useItemDescription,
  // useCreatorPhoto,
  useCreatorButton,
};
