"use client";

import axios from "axios";

export const uploadVideoToCloudinary = async (file: File, id: string) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "nextprototype");
  formData.append("folder", `users profile/${id}/videos`);

  const URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload`;

  const res = await axios.post(URL, formData, {
    onUploadProgress: (e) => {
      if (!e.total) return;
      const percent = Math.round((e.loaded * 100) / e.total);
      console.log("Upload:", percent, "%");
    },
  });

  return res.data;
};
