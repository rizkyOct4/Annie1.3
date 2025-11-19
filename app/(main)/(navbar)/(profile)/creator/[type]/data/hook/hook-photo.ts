"use client";

import {
  useQuery,
  useQueryClient,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import type {
  ListFolderType,
  ItemFolderType,
  ListPostFolderType,
  ItemFolderDescriptionType,
} from "../../type/type";
import axios from "axios";
import { useSearchParams, useParams } from "next/navigation";
import { ROUTES_PROFILE } from "@/app/(main)/(navbar)/(profile)/creator/[type]/config";
import { usePost } from "./sub-post";

const useCreatorButton = (publicId: string) => {
  // ? url
  const [typeBtn, setTypeBtn] = useState<string>("");
  const url = ROUTES_PROFILE.GET_BTN({ key: typeBtn });

  const { data: listPostFolder, isLoading: isLoadingListPost } = useQuery({
    queryKey: ["listFolderPost", publicId, typeBtn],
    queryFn: async () => {
      if (!typeBtn) return [];
      const { data } = await axios.get(url, {
        params: { type: typeBtn },
      });
      return data;
    },
    enabled: !!typeBtn,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false,
    retry: false,
  });

  const ListPostFolderData: ListPostFolderType[] = useMemo(
    () => listPostFolder,
    [listPostFolder]
  );

  return {
    listPostFolder,
    isLoadingListPost,
    ListPostFolderData,
    setTypeBtn,
  };
};

const useCreatorPhoto = (publicId: string) => {
  const queryClient = useQueryClient();
  const { type } = useParams<{ type: string }>();

  const [openFolder, setOpenFolder] = useState({
    isOpen: false,
    isFolder: "",
  });

  const id = useSearchParams().get("id") ?? "";

  // * List Folder
  const {
    data: listFolderPhoto,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["keyListFolderPhoto", publicId, type],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        ROUTES_PROFILE.GET({
          typeConfig: "type",
          type: type,
          pageParam: pageParam,
        })
      );
      return data;
    },
    // ? ketika melakukan fetchNextPage maka akan memanggil queryFn kembali
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

  // * Item Folder
  const {
    data: itemFolderPhoto,
    isLoading,
    // fetchNextPage,
    // hasNextPage,
    // isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["keyItemFolderPhoto", publicId, type, openFolder.isFolder],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_PROFILE.GET({
        typeConfig: "folderName",
        type: type,
        folderName: openFolder.isFolder,
        pageParam: pageParam,
      });
      const { data } = await axios.get(URL, {
        params: { folderName: openFolder.isFolder },
      });
      return data;
    },

    // ? ketika melakukan fetchNextPage maka akan memanggil queryFn kembali
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 60,
    initialPageParam: 1,
    enabled: !!openFolder.isFolder,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });
  ``;

  // * Description item
  const { data: descriptionItemFolderPhoto } = useQuery({
    queryKey: ["keyDescriptionItemFolder", publicId, openFolder.isFolder, id],
    queryFn: async () => {
      const queryKey = [
        "keyDescriptionItemFolder",
        publicId,
        openFolder.isFolder,
        id,
      ];
      if (!queryClient.getQueryData(queryKey)) {
        const URL = ROUTES_PROFILE.GET({
          typeConfig: "id",
          type: type,
          folderName: openFolder.isFolder,
          id: id,
        });
        const { data } = await axios.get(URL);
        return data;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    gcTime: 1000 * 60 * 60, // Cache data akan disimpan selama 1 jam
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false,
    retry: false,
  });

  // *** SUB ========================================= ***
  const keyListFolder = ["keyListFolderPhoto", publicId, type];
  const keyItemFolder = ["keyItemFolderPhoto", publicId, type, openFolder.isFolder];
  const { postPhoto } = usePost({ keyListFolder, keyItemFolder, type });

  const listFolderData = useMemo(
    () => listFolderPhoto?.pages.flatMap((page) => page.data ?? []),
    [listFolderPhoto?.pages]
  );
  const itemFolderData = useMemo(
    () => itemFolderPhoto?.pages.flatMap((page) => page.data ?? []),
    [itemFolderPhoto?.pages]
  );
  const descriptionItemFolderData = useMemo(
    () => descriptionItemFolderPhoto ?? [],
    [descriptionItemFolderPhoto]
  );

  console.log(listFolderPhoto)
  console.log(`2 :`,itemFolderPhoto)

  return {
    listFolderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,

    // ? ====
    itemFolderData,
    openFolder,
    setOpenFolder,
    isLoading,

    // ? === DESCRIPTION ===
    descriptionItemFolderData,
    // listFolderData,
    // itemFolderData,
    // descriptionItemFolderData,

    // * SUB - PHOTO ===
    postPhoto,
  };
};

export { useCreatorPhoto, useCreatorButton };
