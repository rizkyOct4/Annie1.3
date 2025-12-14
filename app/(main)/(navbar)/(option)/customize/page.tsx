import type { Metadata } from "next";
import ProfileCustomize from "./components/modal";
import { Suspense } from "react";
import { RiTwitterLine, RiInstagramLine } from "react-icons/ri";
import { SSRQueryPr } from "@/_util/model-fetch/private";
import GetToken from "@/_lib/middleware/get-token";
import { CONFIG_CUSTOMIZE } from "./config/config-customize";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";

export const metadata: Metadata = {
  title: "Profile Customize",
  description: "Customize whatever you wanted !! Enjoy ",
};

const page = async () => {
  const { id } = await GetToken();
  const queryClient = getQueryClient();

  await SSRQueryPr({
    queryKey: ["keyCustomize", id],
    config: CONFIG_CUSTOMIZE.GET({ typeConfig: "SSRgetCustomize" }),
    queryClient: queryClient,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center text-gray-200">
            Loading profile...
          </div>
        }> */}
      <ProfileCustomize />
      {/* </Suspense> */}
    </HydrationBoundary>
  );
};

export default page;



// todo KAU CARI BESOK INI !! GIMANA  !!
// todo perhatikan lagi sama kau besok queryProvider di layout !! 
