"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RiUserLine,
  RiProfileLine,
  RiPhoneLine,
  RiMapPinLine,
  RiImageLine,
  RiRefreshLine,
} from "react-icons/ri";

const ProfileSchema = z.object({
  username: z.string(),
  biodata: z.string().optional(),
  gender: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must be numeric")
    .optional(),
  location: z.string().optional(),
  currentImage: z.string(),
  pathCurrentImage: z.string().optional(),
  socialLink: z.array().optional(),
  createdAt: z.string(),
  updateAt: z.string().optional(),
});

type ProfileFormData = z.infer<typeof ProfileSchema>;

const ProfileCustomize = ({ data }: { data: any }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: data.username,
      biodata: data.biodata,
      gender: data.gender,
      phoneNumber: data.phoneNumber?.toString(),
      location: data.location,
      currentImage: "",
      pathCurrentImage: data?.pathCurrentImage || "",
      socialLink: data.socialLink,
      createdAt: data.createdAt,
      updateAt: data.updateAt || "",
    },
  });

  // const [isEdit, setIsEdit] = useState({
  //   open: false,
  //   value: "",
  // });

  const onSubmit = (values: ProfileFormData) => {
    console.log("Submit values:", values);
    // di sini bisa panggil API untuk update user
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  // const handleAction = useCallback((actionType: string) => {
  //   switch (actionType) {
  //     case "username":
  //     case "biodata":
  //     case "phoneNumber": {
  //       // console.log(actionType);
  //       setIsEdit((prev) => ({
  //         open: prev.value === actionType ? false : true,
  //         value: prev.value === actionType ? "" : actionType,
  //       }));
  //       break;
  //     }
  //   }
  // }, []);

  const updateData = Object.entries(watch()).map(([key, value]) => ({
    key,
    value,
  }));

  // console.log(updateData);

  return (
    <div className="w-full bg-black/80 text-gray-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-bold mb-10 tracking-tight">
          Profile Settings
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col md:flex-row gap-8">
            {/* <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="w-full border border-white/10 rounded-lg overflow-hidden flex flex-col">
                <div className="w-full h-[340px] relative bg-gray-800">
                  {watch("pathCurrentImage") ? (
                    <Image
                      src={watch("pathCurrentImage") || ""}
                      alt="Profile Picture"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-lg"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <label className="w-full p-3 text-sm text-black cursor-pointer bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setValue("currentImage", file.name, {
                            shouldValidate: true,
                          });
                          setValue(
                            "pathCurrentImage",
                            reader.result as string,
                            { shouldValidate: true }
                          );
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div> */}

            <div className="w-full flex flex-col gap-4">
              {Array.isArray(updateData) && updateData.length > 0
                ? updateData.map(
                    ({ key, value }: { key: string; value: any }) => (
                      <div
                        key={key}
                        className="flex items-center gap-4 border-b border-white/10 pb-2 h-[80px]">
                        <div className="flex items-center justify-between">
                          <div className="w-6 h-6 text-gray-400 flex items-center justify-center">
                            {key === "username" && <RiUserLine />}
                            {key === "biodata" && <RiProfileLine />}
                            {key === "phoneNumber" && <RiPhoneLine />}
                            {key === "location" && <RiMapPinLine />}
                            {(key === "currentImage" ||
                              key === "pathCurrentImage") && <RiImageLine />}
                          </div>
                        </div>

                        {/* Label & value */}
                        <div className="flex flex-col w-full">
                          {key === "socialLink" && Array.isArray(value) ? (
                            value.map(
                              (
                                v: {
                                  platform: string;
                                  link: string;
                                  icon: any;
                                },
                                idx
                              ) => (
                                <div
                                  key={idx}
                                  className="text-gray-300 text-sm">
                                  <span className="font-medium">
                                    {v.platform}
                                  </span>
                                  <span>{v.icon}</span>
                                  <a
                                    href={v.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-blue-500">
                                    {v.link}
                                  </a>
                                </div>
                              )
                            )
                          ) : (
                            <>
                              <div className="w-full">
                                <label className="block font-semibold mb-2">
                                  {key}
                                  <input
                                    type="text"
                                    defaultValue={value}
                                    className="
                  w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 
                  text-gray-200 placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                                  />
                                </label>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  )
                : null}

              {/* Submit button di bawah */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCustomize;


// todo BESOK KONDISIKAN INI LAGI !! BUAT MACAM REPORT PAGE !! PASTIKAN WARNA JANGAN BEDA JAUH !!! 
// TODO DATA DUMMY KAU JUGA !! 