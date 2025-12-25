// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import ModalPanel from "./modal";
// import GetToken from "@/_lib/middleware/get-token";
// import { getQueryClient } from "@/app/get-query-client";
// import { ItemFolderDescription } from "@/_lib/services/navbar/option/profile/services-panel";

// const page = async ({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ type: string; panel: string }>;
//   searchParams: Promise<{
//     "folder-name"?: string;
//     id?: string;
//   }>;
// }) => {
//   const { id } = await GetToken();
//   const queryClient = getQueryClient();

//   const prevPath = (await params).type;
//   const currentPath = (await params).panel;
//   const pathFolderName = (await searchParams)?.["folder-name"] ?? "";
//   const idProduct = Number((await searchParams).id);

//   switch (currentPath) {
//     // case "stats": {
//     //   break;
//     // }
//     case "description": {
//       const queryKeyDescription = [
//         "keyDescriptionItemFolder",
//         id,
//         currentPath,
//         pathFolderName,
//         idProduct,
//       ];

//       await queryClient.prefetchQuery({
//         queryKey: queryKeyDescription,
//         queryFn: () => ItemFolderDescription(idProduct, id),
//       });
//     }
//   }

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <ModalPanel currentPath={currentPath} />
//     </HydrationBoundary>
//   );
// };

// export default page;

// // ? Fitur	ISG (Incremental Static Generation)
// // Static / Cache	Ya, statis tapi bisa direvalidate
// // Update otomatis	Hanya saat revalidate atau rebuild
// // Cocok untuk	Data publik, sama untuk semua user
// // Tidak cocok untuk	Data dinamis per user / butuh auth / query params unik

// // todo BACA ISG, SSG DLL !!! ISG KAU MASIH SALAH !!! IDK WHY !! FIXKAN BESOK !!!
// // todo SSG ++++ iasdiojoaslkdm
// // ! LIAT FETCH.ts !!!
const page = () => {
  return
}

export default page