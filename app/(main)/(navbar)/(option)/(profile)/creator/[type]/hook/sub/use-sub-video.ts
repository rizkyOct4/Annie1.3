"use client";

import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import { ROUTES_PROFILE } from "../../config";
import axios from "axios";
import { MY_CLOUDINARY_NAME } from "@/_lib/config";

export const usePostVideo = ({
  //   keyFolder,
  type,
}: {
  //   keyFolder: Array<string>
  type: string;
  //   keyListFolder: Array<string>;
  //   keyItemFolder: Array<string>;
  //   type: string;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: postVideo } = useMutation({
    // mutationFn: async (formData: FormData) => {
    //   const URL = `https://api.cloudinary.com/v1_1/${MY_CLOUDINARY_NAME}/video/upload`;

    //   const res = await axios.post(URL, formData, {
    //     onUploadProgress: (e) => {
    //       if (!e.total) return;
    //       const percent = Math.round((e.loaded * 100) / e.total);
    //       console.log("Upload:", percent, "%");
    //     },
    //   });

    //   return res.data;
    // },
    mutationFn: async (data) => {
      const URL = ROUTES_PROFILE.ACTION_VIDEO({
        method: "postVideo",
        type: "video",
        path: type,
      });
      const res = await axios.post(URL, data);
      return res.data;
    },
    // onMutate: async (mutate) => {
    //   showToast({ type: "loading", fallback: true });

    //   await Promise.all([
    //     queryClient.cancelQueries({ queryKey: keyFolder }),
    //     queryClient.cancelQueries({ queryKey: keyListFolder }),
    //     queryClient.cancelQueries({ queryKey: keyItemFolder }),
    //   ]);

    //   const prevFolder = queryClient.getQueryData(keyFolder);
    //   const prevListFolderData = queryClient.getQueryData(keyListFolder);
    //   const prevItemFolderData = queryClient.getQueryData(keyItemFolder);

    //   // ? LIST
    //   queryClient.setQueryData<InfiniteData<TOriginalList>>(
    //     keyFolder,
    //     (oldData) => {
    //       if (!oldData) return oldData;

    //       return {
    //         ...oldData,
    //         pages: oldData?.pages.map((page: any) => ({
    //           ...page,
    //           data: page.data.map(
    //             (i: { folder: string[]; totalProduct: number }) => {
    //               const isExistFolder = i.folder.includes(mutate.folderName);

    //               if (!isExistFolder) {
    //                 return {
    //                   ...i,
    //                   totalProduct: i.totalProduct + 1,
    //                   folder: [...i.folder, mutate.folderName],
    //                 };
    //               }
    //               return i;
    //             }
    //           ),
    //         })),
    //       };
    //     }
    //   );

    //   // ? LIST FOLDER
    //   queryClient.setQueryData<InfiniteData<TOriginalListFolder>>(
    //     keyListFolder,
    //     (oldData) => {
    //       if (!oldData) return oldData;

    //       return {
    //         ...oldData,
    //         pages: oldData?.pages.map((page: any) => {
    //           const isExist = page.data.some(
    //             (i: { folderName: string }) =>
    //               i.folderName === mutate.folderName
    //           );
    //           if (isExist) {
    //             return {
    //               ...page,
    //               data: page.data.map(
    //                 (i: { folderName: string; amountItem: number }) =>
    //                   i.folderName === mutate.folderName
    //                     ? { ...i, amountItem: i.amountItem + 1 }
    //                     : i
    //               ),
    //             };
    //           } else {
    //             return {
    //               ...page,
    //               data: [
    //                 ...page.data,
    //                 { folderName: mutate.folderName, amountItem: 1 },
    //               ],
    //             };
    //           }
    //         }),
    //       };
    //     }
    //   );

    //   return { prevFolder, prevListFolderData, prevItemFolderData };
    // },
    // onSuccess: (response) => {
    //   const { data } = response;
    //   showToast({ type: "loading", fallback: false });
    //   queryClient.setQueryData<InfiniteData<TOriginalItemFolder>>(
    //     keyItemFolder,
    //     (oldData) => {
    //       if (!oldData) return oldData;

    //       return {
    //         ...oldData,
    //         pages: oldData?.pages.map((page) => {
    //           const space = page.hasMore !== true;
    //           if (space) {
    //             return {
    //               ...page,
    //               data: [
    //                 ...page.data,
    //                 {
    //                   folderName: data[0].folderName,
    //                   idProduct: data[0].idProduct,
    //                   url: data[0].url,
    //                   createdAt: data[0].createdAt,
    //                 },
    //               ],
    //             };
    //           }
    //           return page;
    //         }),
    //       };
    //     }
    //   );
    // },
    // onError: (error, _variables, context) => {
    //   showToast({ type: "loading", fallback: false });
    //   showToast({ type: "error", fallback: error });
    //   console.error(error);
    //   if (
    //     context?.prevFolder &&
    //     context?.prevListFolderData &&
    //     context?.prevItemFolderData
    //   ) {
    //     queryClient.setQueryData(keyFolder, context.prevFolder);
    //     queryClient.setQueryData(keyListFolder, context.prevListFolderData);
    //     queryClient.setQueryData(keyItemFolder, context.prevItemFolderData);
    //   }
    // },
  });

  return { postVideo };
};

// todo KONDISIKAN BESOK UNTUK VIDEO LAGI !! PASTIKAN SEMUA PAS !! JANGAN ADA BUG !!
