// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CreatorsPage from "./modal";

const page = async () => {
  const currentPath = "creators";
  // const queryClient = getQueryClient();
  // const { id } = await GetToken();

  // const key = ["keyListAllCreators", currentPath, id];

  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: key,
  //   queryFn: ({ pageParam = 1 }) =>
  //     GetAllCreators({
  //       limit: 10,
  //       offset: (pageParam - 1) * 10,
  //     }),
  //   initialPageParam: 1,
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    // <CreatorsCard currentPath={currentPath} />
    <CreatorsPage currentPath={currentPath}/>
    // </HydrationBoundary>
  );
};

export default page;
