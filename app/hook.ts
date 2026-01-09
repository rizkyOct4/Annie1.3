"use client";

import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import { TProfile } from "@/types";
import { useInterest } from "./(main)/(navbar)/(interest)/hook/hook-interest";

export const useProfile = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: userDescription } = useQuery({
    queryKey: ["keyUserDescription", session?.user?.publicId],
    queryFn: async () => {
      const URL = `/api`;
      const res = await axios.get(URL);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user?.publicId,
    gcTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    if (!userDescription || !session?.user?.publicId) return;

    queryClient.setQueryData<TProfile>(
      ["keyUserDescription", session.user.publicId],
      (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((i) => ({
          ...i,
          id: session?.user.publicId,
          username: session?.user.name,
          email: session?.user.email,
          image: session?.user.image,
          role: session?.user.role,
        }));
      }
    );
  }, [
    userDescription,
    session?.user.publicId,
    queryClient,
    session?.user.name,
    session?.user.email,
    session?.user.image,
    session?.user.role,
  ]);

  const { postInterest } = useInterest({
    keyUser: ["keyUserDescription", session?.user?.publicId],
  });

  // * DATA ============
  const profileData: TProfile = useMemo(
    () => userDescription ?? [],
    [userDescription]
  );

  return { profileData, postInterest };
};
