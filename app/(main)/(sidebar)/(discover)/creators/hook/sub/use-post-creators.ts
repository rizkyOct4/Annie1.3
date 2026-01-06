"use client";

import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import { ROUTES_CREATORS } from "../../config";
import axios from "axios";
import {
  TTargetCreatorsDescription,
  OriginalCreatorListData,
  TPostActionLikeOrDislike,
  TPostActionFollow,
  TPostActionBookmark,
  TPostActionComment,
} from "../../types/type";

export const usePost = ({
  id,
  targetId,
  keyListProductCreators,
}: {
  id: string;
  targetId: string;
  keyListProductCreators: Array<string>;
}) => {
  const queryClient = useQueryClient();

  const URL = ROUTES_CREATORS.POST({ key: "like", params: targetId });

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
                  status: null | string;
                }) => {
                  if (i.idProduct !== mutate.refIdProduct) return i;

                  let totalLike = i.totalLike;
                  let totalDislike = i.totalDislike;
                  let status = i.status;

                  if (status === null) {
                    if (mutate.status === "like") {
                      totalLike += 1;
                      status = mutate.status;
                    }
                    if (mutate.status === "dislike") {
                      totalDislike += 1;
                      status = mutate.status;
                    }
                  } else if (mutate.status === "like" && status !== null) {
                    totalLike += 1;
                    if (totalDislike !== 0) totalDislike -= 1;
                    status = mutate.status;
                  } else if (mutate.status === "dislike" && status !== null) {
                    totalDislike += 1;
                    if (totalLike !== 0) totalLike -= 1;
                    status = mutate.status;
                  }
                  return {
                    ...i,
                    totalLike,
                    totalDislike,
                    status: status,
                  };
                }
              ),
            })),
          };
        }
      );

      return { prevListProductCreators };
    },
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

export const usePostFollow = ({
  keyDescriptionUser,
  targetId,
}: {
  keyDescriptionUser: Array<string>;
  targetId: string;
}) => {
  const queryClient = useQueryClient();

  const URL = ROUTES_CREATORS.POST({ key: "follow", params: targetId });

  const { mutateAsync: postFollowUser } = useMutation({
    mutationFn: async (data) => await axios.post(URL, data),
    onMutate: async (mutate: TPostActionFollow) => {
      await queryClient.cancelQueries({
        queryKey: keyDescriptionUser,
      });

      const prevDescriptionUser = queryClient.getQueryData(keyDescriptionUser);

      queryClient.setQueryData<TTargetCreatorsDescription[]>(
        keyDescriptionUser,
        (oldData) => {
          if (!oldData) return oldData;
          return oldData.map((i) => ({
            ...i,
            totalFollowers: mutate.status
              ? i.totalFollowers + 1
              : i.totalFollowers - 1,
            statusFollow: mutate.status,
          }));
        }
      );

      return { prevDescriptionUser };
    },
    onError: (error, _variables, context) => {
      console.error(error);
      if (context?.prevDescriptionUser) {
        queryClient.setQueryData(
          keyDescriptionUser,
          context.prevDescriptionUser
        );
      }
    },
  });

  return { postFollowUser };
};

export const usePostBookmark = ({
  keyListProductCreatorsB,
  targetId,
}: {
  keyListProductCreatorsB: Array<string>;
  targetId: string;
}) => {
  const queryClient = useQueryClient();

  const URL = ROUTES_CREATORS.POST({ key: "bookmark", params: targetId });

  const { mutateAsync: postBookmarkUser } = useMutation({
    mutationFn: async (data) => await axios.post(URL, data),
    onMutate: async (mutate: TPostActionBookmark) => {
      await queryClient.cancelQueries({
        queryKey: keyListProductCreatorsB,
      });

      const prevListProductCreatorsB = queryClient.getQueryData(
        keyListProductCreatorsB
      );

      queryClient.setQueryData<InfiniteData<OriginalCreatorListData>>(
        keyListProductCreatorsB,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData?.pages.map((page: any) => ({
              ...page,
              data: page.data.map((i: { idProduct: number }) =>
                i.idProduct === mutate.idProduct
                  ? {
                      ...i,
                      statusBookmark: mutate.status,
                    }
                  : i
              ),
            })),
          };
        }
      );

      return { prevListProductCreatorsB };
    },
    onError: (error, _variables, context) => {
      console.error(error);
      if (context?.prevListProductCreatorsB) {
        queryClient.setQueryData(
          keyListProductCreatorsB,
          context.prevListProductCreatorsB
        );
      }
    },
  });

  return { postBookmarkUser };
};

export const usePostComment = ({
  keyListPhotoComment,
  targetId,
}: {
  keyListPhotoComment: Array<string | number | null>;
  targetId: string;
}) => {
  const queryClient = useQueryClient();

  const URL = ROUTES_CREATORS.POST({ key: "comment", params: targetId });

  const { mutateAsync: postCommentUser } = useMutation({
    mutationFn: async (data) => await axios.post(URL, data),
    onMutate: async (mutate: TPostActionComment) => {
      await queryClient.cancelQueries({
        queryKey: keyListPhotoComment,
      });

      const prevKeyListPhotoComment =
        queryClient.getQueryData(keyListPhotoComment);

      return { prevKeyListPhotoComment };
    },
    onError: (error, _variables, context) => {
      console.error(error);
      if (context?.prevKeyListPhotoComment) {
        queryClient.setQueryData(
          keyListPhotoComment,
          context.prevKeyListPhotoComment
        );
      }
    },
  });

  return { postCommentUser };
};
