import ListFolder from "./components/list-folder";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import GetToken from "@/_lib/middleware/get-token";
import { getQueryClient } from "@/app/get-query-client";
import { ListFolderPhoto } from "@/_lib/services/navbar/option/profile/services-list-folder";
import Loading from "./loading";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ type: string }> }) => {
  const pathUrl = (await params).type;
  const { id } = await GetToken();

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["keyListFolderPhoto", id, pathUrl],
    queryFn: ({ pageParam = 1 }) =>
      ListFolderPhoto({
        id: id,
        pathUrl: pathUrl,
        limit: 4,
        offset: (pageParam - 1) * 4,
      }),
    initialPageParam: 1,
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <ListFolder currentPath={pathUrl} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
