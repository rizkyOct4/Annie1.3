import { prisma } from "@/_lib/db";
import camelcaseKeys from "camelcase-keys";
// import type { TItemFolderDescription } from "./type";

// ? ITEM DESCRIPTION
export const ItemFolderDescription = async (id: number) => {
  const queryRaw = await prisma.$queryRaw<
    TItemFolderDescription[]
  >`SELECT upi.tar_iu_product, upi.description,upi.url, upi.hashtag, upi.category, COALESCE(SUM(upiv.like), 0)::int AS total_like, COALESCE(SUM(upiv.dislike), 0)::int AS total_dislike, up.created_at
    FROM users_product_image upi
    JOIN users_product up ON (up.iu_product = upi.tar_iu_product)
    LEFT JOIN users_product_image_vote upiv ON (upiv.tar_iu_product = up.iu_product)
    WHERE upi.tar_iu_product = ${id}
    GROUP BY
    upi.description,
    upi.tar_iu_product,
    upi.url,
    upi.hashtag,
    upi.category,
    up.created_at
    `;

  return camelcaseKeys(queryRaw);
};
