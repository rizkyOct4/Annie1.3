"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { profileContext } from "./context";

interface ProfileProviderProps {
  children: React.ReactNode;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  role: string | undefined;
  preferences: {
    theme: "light" | "dark";
    language: string;
    notificationsEnabled: boolean;
    videoQuality: "low" | "medium" | "high";
  };
  contentStats: {
    uploadedVideos: number;
    uploadedPhotos: number;
    totalViews: number;
    totalLikes: number;
  };
  subscription: {
    type: "free" | "premium" | "trial";
    expiresAt?: string;
  };
  followersCount: number;
  followingCount: number;
  createdAt: Date;
  updatedAt: Date | null;
}

const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [data, setData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (session?.user) {
      // Misalnya: mengambil data user dari API, atau menyesuaikan berdasarkan data session
      setData({
        id: session.user.id,
        username: session.user.name,
        email: session.user.email,
        profilePicture: session.user?.image || "",
        role: session.user.role,
        preferences: {
          theme: "light",
          language: "en",
          notificationsEnabled: true,
          videoQuality: "high",
        },
        contentStats: {
          uploadedVideos: 0,
          uploadedPhotos: 0,
          totalViews: 0,
          totalLikes: 0,
        },
        subscription: {
          type: "free",
        },
        followersCount: 0,
        followingCount: 0,
        createdAt: session?.user?.createdAt!,
        updatedAt: null,
      });
    }
  }, [session]);

  // console.log(data);
  return (
    <profileContext.Provider value={{ data, setData }}>
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;
