"use client";

import { ROUTES_CREATORS } from "@/app/(main)/(sidebar)/(discover)/creators/config";
import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  usePost,
  usePostBookmark,
  usePostFollow,
  usePostComment,
} from "./sub/use-post-creators";
import { ModalState } from "../types/interface";
import type {
  TTargetCreatorsDescription,
  TListCreatorProduct,
  TListCreatorVideo,
} from "../types/type";
import { SortASC } from "@/_util/GenerateData";

const useCreators = (id: string) => {
  const currentPath = "creators";
  // * List Creators
  const {
    data: listCreators,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["keyListAllCreators", currentPath, id],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        ROUTES_CREATORS.GET({ typeConfig: currentPath, pageParams: pageParam })
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
    enabled: !!currentPath,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  // ? useInfiniteQuery menyimpan hasil di dalam data.pages, kamu bisa akses begini:
  const listCreatorsData = useMemo(
    () => listCreators?.pages.flatMap((page) => page.data) ?? [],
    [listCreators?.pages]
  );
  // console.log(listCreators)

  return { listCreatorsData, fetchNextPage, hasNextPage, isFetchingNextPage };
};

const useCreatorsDescription = (id: string) => {
  const { id: targetId } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  // console.log(view)

  // * STATE ==============
  const [open, setOpen] = useState<ModalState>({
    isOpen: true,
    isValue: "Profile",
    isPublicId: null,
  });
  const [sortVideo, setSortVideo] = useState<"latest" | "oldest">("latest");

  const [idComment, setIdComment] = useState<number | null>(null);
  const [idSubComment, setIdSubComment] = useState<number | null>(null);

  // * STATE END ==============

  // * Creators Description
  const { data: creatorDescription } = useQuery({
    queryKey: ["keyTargetCreatorDescription", id, targetId],
    queryFn: async () => {
      const URL = ROUTES_CREATORS.GET({
        typeConfig: "creatorsDescription",
        targetId: targetId,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!targetId,
    gcTime: 1000 * 60 * 60, // Cache data akan disimpan selama 1 jam
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  // * List Creators Photos
  const {
    data: listProductCreators,
    fetchNextPage: fetchNextPageProduct,
    hasNextPage: hasNextPageProduct,
    isFetchingNextPage: isFetchingNextPageProduct,
  } = useInfiniteQuery({
    queryKey: ["keyListProductCreators", id, targetId],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_CREATORS.GET({
        typeConfig: "listCreatorsProduct",
        pageParams: pageParam,
        targetId: targetId,
        key: "photo",
      });
      const { data } = await axios.get(URL);
      return data;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 60,

    // ? ketika melakukan fetchNextPage maka akan memanggil queryFn kembali
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!targetId && open.isValue === "Photos",
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  // ? COMMENT SECTIO
  // * List Creators Photos Comments
  const { data: listProductPhotoComment } = useInfiniteQuery({
    queryKey: ["keyListProductPhotoComment", id, targetId, idComment],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_CREATORS.GET_ACTION({
        pageParams: pageParam,
        targetId: targetId,
        key: "comment",
        idProduct: idComment,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 60,

    // ? ketika melakukan fetchNextPage maka akan memanggil queryFn kembali
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!targetId && open.isValue === "Photos" && !!idComment,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  // * List Creators Photos Sub Comments
  const { data: listProductPhotoSubComment } = useInfiniteQuery({
    queryKey: ["keyListProductPhotoSubComment", id, targetId, idSubComment],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_CREATORS.GET_ACTION({
        pageParams: pageParam,
        targetId: targetId,
        key: "sub_comment",
        idSubComment: idSubComment,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 60,

    // ? ketika melakukan fetchNextPage maka akan memanggil queryFn kembali
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!targetId && open.isValue === "Photos" && !!idSubComment,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });


  // ! VIDEO SECTION =========================
  // * List Creators Videos
  const { data: listProductCreatorsVideo } = useInfiniteQuery({
    queryKey: ["keyListProductCreatorsVideo", id, targetId],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_CREATORS.GET({
        typeConfig: "listCreatorsProductVideo",
        pageParams: pageParam,
        targetId: targetId,
        key: "video",
      });
      const { data } = await axios.get(URL);
      return data;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 60,

    // ? ketika melakukan fetchNextPage maka akan memanggil queryFn kembali
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!targetId && open.isValue === "Videos",
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
  });

  // ? child hook
  const { postLikePhoto } = usePost({
    id: id,
    targetId: targetId,
    keyListProductCreators: ["keyListProductCreators", id, targetId],
  });
  const { postFollowUser } = usePostFollow({
    keyDescriptionUser: ["keyTargetCreatorDescription", id, targetId],
    targetId: targetId,
  });
  const { postBookmarkUser } = usePostBookmark({
    keyListProductCreatorsB: ["keyListProductCreators", id, targetId],
    targetId: targetId,
  });
  const { postCommentUser } = usePostComment({
    keyListPhotoComment: [
      "keyListProductPhotoComment",
      id,
      targetId,
      idComment,
    ],
    targetId: targetId,
  });

  // * DATA ===========================================================
  const creatorDescriptionData: TTargetCreatorsDescription[] = useMemo(
    () => creatorDescription ?? [],
    [creatorDescription]
  );
  const listCreatorProductData: TListCreatorProduct[] = useMemo(
    () => listProductCreators?.pages.flatMap((page) => page.data) ?? [],
    [listProductCreators?.pages]
  );
  const listCreatorProductDataComment = useMemo(
    () => listProductPhotoComment?.pages.flatMap((page) => page.data) ?? [],
    [listProductPhotoComment?.pages]
  );
  const listCreatorProductDataSubComment = useMemo(
    () => listProductPhotoSubComment?.pages.flatMap((page) => page.data) ?? [],
    [listProductPhotoSubComment?.pages]
  );

  // * VIDEO LIST
  const ListCreatorVideoData: TListCreatorVideo[] = useMemo(
    () => listProductCreatorsVideo?.pages.flatMap((page) => page.data) ?? [],
    [listProductCreatorsVideo?.pages]
  );
  const sortItemVideo = useMemo(
    () => SortASC(ListCreatorVideoData),
    [ListCreatorVideoData]
  );

  return {
    creatorDescriptionData,
    listCreatorProductData,
    listCreatorProductDataComment,
    listCreatorProductDataSubComment,
    fetchNextPageProduct,
    hasNextPageProduct,
    isFetchingNextPageProduct,

    // ? VIDEO
    ListCreatorVideoData,
    sortItemVideo,

    // ? state
    open,
    setOpen,
    sortVideo,
    setSortVideo,
    idComment,
    setIdComment,
    setIdSubComment,

    // ! ACTION
    postLikePhoto,
    postFollowUser,
    postBookmarkUser,
    postCommentUser,
  };
};

export { useCreators, useCreatorsDescription };
