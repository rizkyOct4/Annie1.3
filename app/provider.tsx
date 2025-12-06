"use client";

import { ReactNode } from "react";
import { profileContext } from "./context";
import type { ProfileContextType } from "./context";

import { useSession } from "next-auth/react";

interface ProfileProviderProps {
  children: ReactNode;
}

const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  console.log(session?.user);
  // console.log(data);
  //   const refetchUser = async () => {
  //     try {
  //       const userData = await UserProfileData(
  //         state.user?.email,
  //         state.user?.token
  //       );
  //       dispatch({ type: "REFETCH_USER", payload: userData });
  //     } catch (error) {
  //       console.error("Failed to refetch user:", error);
  //     }
  //   };

  return (
    <profileContext.Provider value={session?.user}>
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;
