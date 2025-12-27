import { prisma } from "@/_lib/db";
import { cacheLife, cacheTag } from "next/cache";
import camelcaseKeys from "camelcase-keys";
import type { TTargetCreatorsDescription } from "./type";

// * LIST CREATORS
export const GetAllCreators = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  "use cache";
  cacheLife("minutes");
  cacheTag(`all-creators`);

  const query = await prisma.$queryRaw<
    CreatorsType[]
  >`SELECT u.id, u.created_at, ud.username, ud.picture
    FROM users u
    LEFT JOIN users_description ud ON (ud.ref_id = u.id)
    ORDER BY u.created_at ASC
    LIMIT ${limit}
    OFFSET ${offset}
    `;

  const amountUsers = await prisma.$queryRaw<
    {
      amount_users: number;
    }[]
  >`SELECT COUNT(id) AS amount_users FROM users`;

  const hasMore = offset + limit < Number(amountUsers[0].amount_users);

  const data = camelcaseKeys(query);

  return {
    data,
    hasMore,
  };
};

// * CREATOR DESCRIPTION
export const GetTargetCreatorsDescription = async ({
  idTargetCreator,
}: {
  idTargetCreator: string;
}) => {
  "use cache";
  cacheLife("minutes");
  cacheTag(`target-creators-description-${idTargetCreator}`);

  const query = await prisma.$queryRaw<
    TTargetCreatorsDescription[]
  >`SELECT ud.username, ud.biodata, ud.gender, ud.phone_number AS "phoneNumber", ud.location, ud.picture, ud.social_link AS "socialLink"
    FROM users u 
    LEFT JOIN users_description ud ON (ud.ref_id = u.id)
    WHERE u.id = ${idTargetCreator}::uuid
    `;

  return camelcaseKeys(query);
};

// * LIST CREATOR PRODUCT
export const GetListCreatorsProduct = async ({
  idTarget,
  idSender,
  limit,
  offset,
}: {
  idTarget: string;
  idSender: string;
  limit: number;
  offset: number;
}) => {
  const query = await prisma.$queryRaw<
    any[]
  >`SELECT upi.ref_id_product AS "idProduct", upi.description, upi.url, upi.hashtag, upi.category, up.created_at, COALESCE(SUM(upiv.like), 0)::int AS total_like, COALESCE(SUM(upiv.dislike), 0)::int AS total_dislike, upio.status
    FROM users u
    JOIN users_product up ON (up.ref_id = u.id)
    JOIN users_product_image upi ON (upi.ref_id_product = up.id_product)
    LEFT JOIN users_product_image_vote upiv ON (upiv.ref_id_product = up.id_product)
    LEFT JOIN (
      SELECT status, ref_id_product
      FROM users_product_image_vote
      WHERE ref_id_sender = ${idSender}::uuid
    ) upio on (up.id_product = upio.ref_id_product)
    WHERE u.id = ${idTarget}::uuid
    GROUP BY
      upi.ref_id_product, upi.description, upi.url, upi.hashtag, upi.category, up.created_at, upio.status
    LIMIT ${limit}
    OFFSET ${offset}
    `;

  if (!query) return [];

  const queryTotal = await prisma.$queryRaw<{ amount_products: number }[]>`
    SELECT COALESCE(COUNT(upi.ref_id_product), 0) AS amount_products 
    FROM users_product_image upi
    JOIN users_product up ON (up.id_product = upi.ref_id_product)
    WHERE up.ref_id = ${idTarget}::uuid
    `;

  const hasMore = offset + limit < Number(queryTotal[0].amount_products);

  // const data = query.map((i) => ({
  //   iuProduct: i.tar_iu_product,
  //   description: i.description,
  //   url: i.url,
  //   hashtag: i.hashtag,
  //   category: i.category,
  //   createdAt: i.created_at,
  //   totalLike: i.total_like,
  //   totalDislike: i.total_dislike,
  //   status: i.status,
  // }));
  const data = camelcaseKeys(query)

  return { data, hasMore };
};

export const PostLikeImage = async (
  publicId: string | undefined,
  iuVote: number,
  tarIuReceiver: number,
  tarIuProduct: number,
  like: number,
  status: boolean,
  createdAt: Date
) => {
  try {
    return prisma.$transaction(async (tx) => {
      const [senderIu] = await tx.$queryRaw<
        { iu: number }[]
      >`SELECT iu FROM users WHERE public_id = ${publicId}::uuid LIMIT 1`;
      const [receiverIu] = await tx.$queryRaw<
        { iu: number }[]
      >`SELECT iu FROM users WHERE public_id = ${tarIuReceiver}::uuid LIMIT 1`;
      const sender = senderIu.iu;
      const receiver = receiverIu.iu;

      await tx.$executeRaw`INSERT INTO users_product_image_vote (tar_iu_sender, tar_iu_receiver, tar_iu_product, iu_vote, "like", status, created_at) 
      VALUES (${sender}, ${receiver}, ${tarIuProduct}, ${iuVote}, ${like}, ${status}, ${createdAt}::timestamp)`;
    });
  } catch (err: any) {
    throw new Error(err.message || "Insert failed");
  }
};
