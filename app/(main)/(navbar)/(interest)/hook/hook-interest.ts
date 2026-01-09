"use client";

import { ROUTES_PROFILE_DESCRIPTION } from "../config/routes";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { TPostInterest } from "../types/type";
import type { TProfile } from "@/types";

export const useInterest = ({
  keyUser,
}: {
  keyUser: Array<string | undefined>;
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: postInterest } = useMutation({
    mutationFn: async (data) => {
      const URL = ROUTES_PROFILE_DESCRIPTION.ACTION({ key: "interest" });
      const res = await axios.post(URL, data);
      return res.data;
    },
    onMutate: async (mutate: TPostInterest) => {
      await queryClient.cancelQueries({
        queryKey: keyUser,
      });

      const prevUser = queryClient.getQueryData(keyUser);

      queryClient.setQueryData<TProfile>(keyUser, (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((i) => ({
          ...i,
          interest: mutate.interest,
        }));
      });

      return { prevUser };
    },
    onError: (error, _variables, context) => {
      console.error(error);
      if (context?.prevUser) {
        queryClient.setQueryData(keyUser, context.prevUser);
      }
    },
  });

  return { postInterest };
};
