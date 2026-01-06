import { prisma } from "@/_lib/db";
import { cacheLife, cacheTag } from "next/cache";
import camelcaseKeys from "camelcase-keys";

export const PostCommentPhoto = async ({
  refIdProduct,
  idComment,
  refIdSender,
  refIdReceiver,
  body,
  typeComment,
  createdAt,
}: {
  refIdProduct: number;
  idComment: number;
  refIdSender: string;
  refIdReceiver: string;
  body: string;
  typeComment: "comment" | "subComment";
  createdAt: Date;
}) => {
  return prisma.$transaction(async (tx) => {
    // ! DB users_photo_stats
    await tx.$executeRaw`
        UPDATE users_photo_stats SET
            comment = users_photo_stats.comment + 
            CASE 
                WHEN ${typeComment} = "comment" THEN 1 ELSE 0
            END,
            sub_comment = users_photo_stats.sub_comment +
            CASE
                WHEN ${typeComment} = "subComment" THEN 1 ELSE 0
            END
        WHERE ref_id_product = ${refIdProduct}
    `;

    // * DB comment_threads
    await tx.$executeRaw`
      INSERT INTO comment_threads (ref_id_product, id_comment, type_comment, created_at)
      VALUES (${refIdProduct}, ${idComment}, ${typeComment}::type_product, ${createdAt}::timestamp)`

    // * DB users_interactions_comment
    await tx.$executeRaw`
      INSERT INTO users_interactions_comment (ref_id_sender, created_at, body, ref_id_comment, ref_id_receiver)
        VALUES ((SELECT id FROM users WHERE public_id = ${refIdSender}), ${createdAt}, ${body}, ${idComment}, (SELECT id FROM users WHERE public_id = ${refIdReceiver}))
    `

  });
};
