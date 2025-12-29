"use client";

import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import { ROUTES_CREATORS } from "../../config";
import axios from "axios";
import {
  TPostActionLikeOrDislike,
  OriginalCreatorListData,
} from "../../types/type";

const usePost = ({
  id,
  targetId,
  keyListProductCreators,
}: {
  id: string;
  targetId: string;
  keyListProductCreators: Array<string>;
}) => {
  const queryClient = useQueryClient();

  const URL = ROUTES_CREATORS.POST({ key: "likePost", params: targetId });

  const { mutateAsync: postLikePhoto } = useMutation({
    mutationFn: async (data) => await axios.post(URL, data),
    onMutate: async (mutate: TPostActionLikeOrDislike) => {
      await queryClient.cancelQueries({
        queryKey: keyListProductCreators,
      });

      const prevListProductCreators = queryClient.getQueryData(
        keyListProductCreators
      );

      queryClient.setQueryData<InfiniteData<OriginalCreatorListData>>(
        keyListProductCreators,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData?.pages.map((page: any) => ({
              ...page,
              data: page.data.map(
                (i: {
                  idProduct: number;
                  totalLike: number;
                  totalDislike: number;
                }) => {
                  if (i.idProduct !== mutate.refIdProduct) return i;

                  let totalLike = i.totalLike;
                  let totalDislike = i.totalDislike;

                  if (mutate.status === "like") {
                    totalLike += 1;
                    if (totalDislike !== 0) totalDislike -= 1;
                  }
                  if (mutate.status === "dislike") {
                    totalDislike += 1;
                    if (totalLike !== 0) totalLike -= 1;
                  }
                  return {
                    ...i,
                    totalLike,
                    totalDislike,
                    status: mutate.status,
                  };
                }
              ),
            })),
          };
        }
      );

      return { prevListProductCreators };
    },
    // onMutate: async (mutate: any) => {
    //   await queryClient.cancelQueries({
    //     queryKey: listCreatorKey,
    //   });

    //   const prevListProductData = queryClient.getQueryData(listCreatorKey);

    //   queryClient.setQueryData<InfiniteData<OriginalCreatorListData>>(
    //     listCreatorKey,
    //     (oldData) => {
    //       if (!oldData) return oldData;

    //       return {
    //         ...oldData,
    //         pages: oldData.pages.flatMap((page) => ({
    //           ...page,
    //           data: page?.data.map((i: { iuProduct: number; totalLike: number }) =>
    //             i.iuProduct === mutate.tar_iu_product
    //               ? {
    //                   ...i,
    //                   totalLike: (i.totalLike ?? 0) + mutate.like,
    //                   status: mutate.status,
    //                 }
    //               : i
    //           ),
    //         })),
    //       };
    //     }
    //   );

    //   return { prevListProductData };
    // },
    onError: (error, _variables, context) => {
      console.error(error);
      if (context?.prevListProductCreators) {
        queryClient.setQueryData(
          keyListProductCreators,
          context.prevListProductCreators
        );
      }
    },
  });
  return { postLikePhoto };
};

export { usePost };
