// import { prisma } from "@/_lib/db";
// import camelcaseKeys from "camelcase-keys";

// // ? LIST ITEM FOLDER
// export const ListItemFolderPhoto = async ({
//   publicId,
//   path,
//   year,
//   month,
//   limit,
//   offset,
// }: {
//   publicId: string | undefined;
//   path: string;
//   year: number;
//   month: number;
//   limit: number;
//   offset: number;
// }) => {
//   const dataRaw = await prisma.$queryRaw<any[]>`
//         SELECT up.folder_name, COUNT(up.folder_name)::int AS amount_item
//         FROM users_product up
//         JOIN users u ON (u.iu = up.tar_iu)
//         WHERE u.public_id = ${publicId}::uuid
//         AND EXTRACT(YEAR FROM up.created_at)::int = ${year}
//         AND EXTRACT(MONTH FROM up.created_at)::int = ${month}
//         AND up.type = ${path}::type_product
//         GROUP BY
//             up.folder_name
//         LIMIT ${limit}
//         OFFSET ${offset}
//     `;

//   // ? JIKA ADA FOLDER_NAME YG SAMA MAKA GROUPKAN MENJADI 1
//   const queryCheck = await prisma.$queryRaw<{ amount_folder: number }[]>`
//         SELECT COUNT(DISTINCT up.folder_name)::int AS amount_folder
//         FROM users_product up
//         JOIN users u ON (u.iu = up.tar_iu)
//         WHERE u.public_id = ${publicId}::uuid
//         AND EXTRACT(YEAR FROM up.created_at)::int = ${year}
//         AND EXTRACT(MONTH FROM up.created_at)::int = ${month}
//         AND up.type = ${path}::type_product
//     `;

//   const data = camelcaseKeys(dataRaw);
//   const hasMore = offset + limit < Number(queryCheck[0].amount_folder);

//   return { data, hasMore };
// };

// // ? ITEM FOLDER
// export const ItemFolderPhoto = async ({
//   path,
//   folderName,
//   limit,
//   offset,
// }: {
//   path: string;
//   folderName: string;
//   limit: number;
//   offset: number
// }) => {
//   const dataRaw = await prisma.$queryRaw<any[]>`
//     SELECT upi.tar_iu_product, upi.url
//     FROM users_product_image upi
//     JOIN users_product up ON (up.iu_product = upi.tar_iu_product)
//     WHERE up.folder_name = ${folderName} AND up.type = ${path}::type_product
//     LIMIT ${limit}
//     OFFSET ${offset}
//     `;

//   const queryCheck = await prisma.$queryRaw<{ amount_item: number }[]>`
//       SELECT COUNT(up.folder_name) AS amount_item
//       FROM users_product up
//       JOIN users u ON (u.iu = up.tar_iu)
//       WHERE up.folder_name = ${folderName}`;

//   const hasMore = offset + limit < Number(queryCheck[0].amount_item);

//   const data = camelcaseKeys(dataRaw);

//   return { data, hasMore };
// };


// //todo perbaiki SEMUA RELASI TABEL YG PERLU INDEX !! BUAT SEMUANYA JADI CEPAT !!
// // todo WHERE, JOIN, GROUP DLL !! CARI SAMA KAU BESOK !!