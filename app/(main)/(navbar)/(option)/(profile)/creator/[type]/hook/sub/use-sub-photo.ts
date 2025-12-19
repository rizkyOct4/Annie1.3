"use client";

import { ROUTES_PROFILE } from "../../config";
import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import type {
  TOriginalListFolder,
  TOriginalItemFolder,
} from "../../types/type";
import { showToast } from "@/_util/Toast";
import type { TImagePost } from "../../schema/schema-form";

const usePost = ({
  keyListFolder,
  keyItemFolder,
  type,
}: {
  keyListFolder: Array<string>;
  keyItemFolder: Array<string>;
  type: string;
}) => {
  const queryClient = useQueryClient();

  const URL = ROUTES_PROFILE.ACTION_PHOTO({
    method: "post",
    type: "photo",
    path: type,
  });

  const { mutateAsync: postPhoto } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(URL, data);
      return res.data;
    },
    onMutate: async (mutate: TImagePost) => {
      showToast({ type: "loading", fallback: true });

      await queryClient.cancelQueries({
        queryKey: keyListFolder,
      });
      await queryClient.cancelQueries({
        queryKey: keyItemFolder,
      });

      const prevListFolderData = queryClient.getQueryData(keyListFolder);
      const prevItemFolderData = queryClient.getQueryData(keyItemFolder);

      queryClient.setQueryData<InfiniteData<TOriginalListFolder>>(
        keyListFolder,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData?.pages.map((page: any) => {
              const isExist = page.data.some(
                (i: { folderName: string }) =>
                  i.folderName === mutate.folderName
              );
              if (isExist) {
                return {
                  ...page,
                  data: page.data.map(
                    (i: { folderName: string; amountItem: number }) =>
                      i.folderName === mutate.folderName
                        ? { ...i, amountItem: i.amountItem + 1 }
                        : i
                  ),
                };
              } else {
                return {
                  ...page,
                  data: [
                    ...page.data,
                    { folderName: mutate.folderName, amountItem: 1 },
                  ],
                };
              }
            }),
          };
        }
      );

      return { prevListFolderData, prevItemFolderData };
    },
    onSuccess: (response) => {
      const { data } = response;
      showToast({ type: "loading", fallback: false });
      queryClient.setQueryData<InfiniteData<TOriginalItemFolder>>(
        keyItemFolder,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData?.pages.map((page) => {
              const space = page.hasMore !== true;
              if (space) {
                return {
                  ...page,
                  data: [
                    ...page.data,
                    { idProduct: data[0].idProduct, url: data[0].url },
                  ],
                };
              }
              return page;
            }),
          };
        }
      );
    },
    onError: (error, _variables, context) => {
      showToast({ type: "loading", fallback: false });
      showToast({ type: "error", fallback: error });
      console.error(error);
      if (context?.prevListFolderData && context?.prevItemFolderData) {
        queryClient.setQueryData(keyListFolder, context.prevListFolderData);
        queryClient.setQueryData(keyItemFolder, context.prevItemFolderData);
      }
    },
  });

  return { postPhoto };
};

const usePut = ({
  keyDescriptionItem,
  keyItemFolder,
  type,
}: {
  keyDescriptionItem: any[];
  keyItemFolder: any[];
  type: string;
}) => {
  const queryClient = useQueryClient();

  const URL = ROUTES_PROFILE.ACTION_PHOTO({
    method: "put",
    type: "photo",
    path: type,
  });

  const { mutateAsync: putPhoto } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.put(URL, data);
      return res.data;
    },
    onMutate: async () => {
      showToast({ type: "loading", fallback: true });

      await queryClient.cancelQueries({
        queryKey: keyDescriptionItem,
      });

      const prevDescriptionItemData =
        queryClient.getQueryData(keyDescriptionItem);

      return { prevDescriptionItemData };
    },
    onSuccess: (response) => {
      const { data } = response.data;

      // ? DESCTIPTION
      queryClient.setQueryData(keyDescriptionItem, (oldData) => {
        if (!oldData) return [];

        return oldData.map((i) => ({
          ...i,
          description: data[0].description,
          hashtag: data[0].hashtag,
          category: data[0].category,
          url: data[0].url,
          createdAt: data[0].createdAt,
        }));
      });

      // ? ITEMS FOLDER
      queryClient.setQueryData<InfiniteData<OriginaItemFolderType>>(
        keyItemFolder,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData?.pages.flatMap((page: any) => ({
              ...page,
              data: page.data.map((s: { tarIuProduct: number }) =>
                s.tarIuProduct === data[0].tarIuProduct
                  ? {
                      ...s,
                      url: data[0].url,
                    }
                  : s
              ),
            })),
          };
        }
      );

      showToast({ type: "loading", fallback: false });
    },
    onError: (error, _variables, context) => {
      showToast({ type: "loading", fallback: false });
      showToast({ type: "error", fallback: error });
      console.error(error);
      if (context?.prevDescriptionItemData) {
        queryClient.setQueryData(
          keyDescriptionItem,
          context.prevDescriptionItemData
        );
      }
    },
  });

  return { putPhoto };
};

export { usePost, usePut };
