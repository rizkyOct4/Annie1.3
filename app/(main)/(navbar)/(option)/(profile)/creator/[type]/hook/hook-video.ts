"use client";

import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams, usePathname } from "next/navigation";
import { ROUTES_LIST_FOLDER } from "../config/list-folder";
import { useMemo, useState, useEffect } from "react";
import { usePostVideo } from "./sub/use-sub-video";

const useCreatorVideo = (id: string) => {
  const { type } = useParams<{ type: string }>();

  const { data: listFolderVideo } = useInfiniteQuery({
    queryKey: ["keyListFolderVideo", id, type],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        ROUTES_LIST_FOLDER.GET({
          typeConfig: "listFolderVideo",
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

  // ? LIST FOLDERS DATA
  const listFolderVideoData = useMemo(
    () => listFolderVideo?.pages.flatMap((page) => page?.data ?? []),
    [listFolderVideo?.pages]
  );

  // ? SUB =====
  const { postVideo } = usePostVideo({ type: type });

  return { listFolderVideoData, postVideo };
};

export { useCreatorVideo };
