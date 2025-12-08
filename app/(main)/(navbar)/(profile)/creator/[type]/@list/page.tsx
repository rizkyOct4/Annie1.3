import ListFolder from "./components/list-folder";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ROUTES_LIST_FOLDER } from "../config/list-folder";
import { SSRInfiniteQueryPr } from "@/_util/model-fetch/private";
import GetToken from "@/_lib/middleware/get-token";

const page = async ({ params }: { params: Promise<{ type: string }> }) => {
  const pathUrl = (await params).type;
  const { queryClient, id } = await GetToken();

  await SSRInfiniteQueryPr({
    queryKey: ["keyListFolderPhoto", id, pathUrl],
    config: ROUTES_LIST_FOLDER.GET,
    typeConfig: "listFolderPhoto",
    path: pathUrl,
    queryClient: queryClient,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListFolder currentPath={pathUrl} />
    </HydrationBoundary>
  );
};

export default page;
