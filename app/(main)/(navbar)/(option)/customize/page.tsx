import type { Metadata } from "next";
import ProfileCustomize from "./components/modal";
import { Suspense } from "react";
import { RiTwitterLine, RiInstagramLine } from "react-icons/ri";
import { SSRQueryPr, NewQueryPath } from "@/_util/model-fetch/private";
import GetToken from "@/_lib/middleware/get-token";
import { CONFIG_CUSTOMIZE } from "./config/config-customize";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Profile Customize",
  description: "Customize whatever you wanted !! Enjoy ",
};

// export const dummyUser: any = [
//   {
//     // iu: 1001,
//     username: "John Doe",
//     biodata:
//       "Software engineer with interest in UI/UX, backend systems, and robotics. I love building simple yet meaningful digital experiences.",
//     gender: "male",
//     phoneNumber: "+6289876543210",
//     location: "Jakarta, Indonesia",
//     pathCurrentImage: "/photo/second.webp",
//     socialLink: [
//       {
//         platform: "twitter",
//         link: "https://twitter.com/johndoe",
//         icon: <RiTwitterLine />,
//       },
//       {
//         platform: "instagram",
//         link: "https://instagram.com/johndoe",
//         icon: <RiInstagramLine />,
//       },
//     ],
//     // createdAt: "2025-01-01T10:24:00.000Z",
//     // updateAt: null,
//   },
// ];

const page = async () => {
  const { queryClient } = await NewQueryPath();
  const token = await GetToken();
  const { id } = token;

  await SSRQueryPr({
    queryKey: ["keyCustomize", id],
    config: CONFIG_CUSTOMIZE.GET({ typeConfig: "SSRgetCustomize" }),
    queryClient: queryClient,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center text-gray-200">
            Loading profile...
          </div>
        }>
        <ProfileCustomize />
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
