import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ItemDescription from "./id-desc";
import { ROUTES_PROFILE } from "@/app/(main)/(navbar)/(profile)/creator/[type]/config";
import Fetching from "@/_util/fetch";
import { SSRQuery } from "@/_util/fetch";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ "folder-name": string; id: string }>;
}) => {
  const { queryClient, publicId } = await Fetching();
  const type = (await params).type;
  const srcFolderName = (await searchParams)?.["folder-name"];
  const srcId = (await searchParams)?.id;

  const queryKey = ["keyDescriptionItemFolder", publicId, srcFolderName, srcId];
  const config = ROUTES_PROFILE.GET({
    typeConfig: "id",
    type: type,
    folderName: srcFolderName,
    id: srcId,
  });

  await SSRQuery({
    queryKey: queryKey,
    config: config,
    queryClient: queryClient,
  });

  return (
    <>
      {srcId && (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ItemDescription />
        </HydrationBoundary>
      )}
    </>
  );
};

export default page;

