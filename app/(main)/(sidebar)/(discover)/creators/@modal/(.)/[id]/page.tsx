import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ModalPopup from "./modal-creators";
import { getQueryClient } from "@/app/get-query-client";
import GetToken from "@/_lib/middleware/get-token";
import { GetTargetCreatorsDescription } from "@/_lib/services/sidebar/discover/creators/services-creators";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const currentPath = (await params).id;
  const queryClient = getQueryClient();
  const { id } = await GetToken();
  const key = ["keyTargetCreatorDescription", id, currentPath];

  await queryClient.prefetchQuery({
    queryKey: key,
    queryFn: () =>
      GetTargetCreatorsDescription({
        idTargetCreator: currentPath,
        idSender: id,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalPopup />
    </HydrationBoundary>
  );
};

export default page;
