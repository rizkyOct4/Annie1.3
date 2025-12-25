import ListFolder from "./components/list-folder";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import GetToken from "@/_lib/middleware/get-token";
import { getQueryClient } from "@/app/get-query-client";
import { GetListFolder } from "@/_lib/services/navbar/option/profile/services-list-folder";

const page = async ({ params }: { params: Promise<{ type: string }> }) => {
  const pathUrl = (await params).type;
  const { id } = await GetToken();

  const queryClient = getQueryClient();

  const key =
    pathUrl === "photo"
      ? ["keyListFolderPhoto", id, pathUrl]
      : ["keyListFolderVideo", id, pathUrl];

  await queryClient.prefetchInfiniteQuery({
    queryKey: key,
    queryFn: ({ pageParam = 1 }) =>
      GetListFolder({
        id: id,
        pathUrl: pathUrl,
        limit: 4,
        offset: (pageParam - 1) * 4,
      }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListFolder currentPath={pathUrl} />
    </HydrationBoundary>
  );
};

export default page;
