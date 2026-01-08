import { prisma } from "@/_lib/db";
import { cacheLife, cacheTag } from "next/cache";
import camelcaseKeys from "camelcase-keys";
import type {
  TAllCreators,
  TListCreatorVideo,
  TListCreatorPhoto,
  TListCommentPhoto,
  TTargetCreatorsDescription,
} from "./type";

// * LIST CREATORS
export const GetAllCreators = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  const query = await prisma.$queryRaw<TAllCreators>`
    SELECT u.public_id, u.created_at, ud.username, ud.picture
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
  >`SELECT COALESCE(COUNT(id), 0) AS amount_users FROM users`;

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
  idSender,
}: {
  idTargetCreator: string;
  idSender: string | undefined;
}) => {
  "use cache";
  cacheLife("minutes");
  cacheTag(`target-creators-description-${idTargetCreator}`);

  const query = await prisma.$queryRaw<
    TTargetCreatorsDescription[]
  >`SELECT u.public_id, ud.username, ud.biodata, ud.gender, ud.phone_number AS "phoneNumber", ud.location, ud.picture, ud.social_link AS "socialLink", u.created_at,
    us.total_image AS "totalPhoto", us.total_video AS "totalVideo", us.total_followers AS "totalFollowers", COALESCE(uif.status, false) AS "statusFollow"
    FROM users u 
    LEFT JOIN users_description ud ON (ud.ref_id = u.id)
    JOIN users_stats us ON (us.ref_id_user = u.id)
    LEFT JOIN users_interactions_followers uif ON 
      (uif.ref_id_sender = (SELECT id FROM users WHERE public_id = ${idSender}))
    WHERE u.public_id = ${idTargetCreator}
    `;

  return camelcaseKeys(query);
};

// * LIST CREATOR PHOTO
export const GetListCreatorsProduct = async ({
  idTarget,
  idSender,
  limit,
  offset,
}: {
  idTarget: string;
  idSender: string | undefined;
  limit: number;
  offset: number;
}) => {
  const query = await prisma.$queryRaw<TListCreatorPhoto>`
    SELECT upi.ref_id_product AS id_product, upi.description, upi.url, upi.hashtag, upi.category, up.created_at,
      ups.like AS total_like, ups.dislike AS total_dislike, ups.comment AS "totalComment",
      uiv.action_vote::status_action_vote AS status, COALESCE(uib.status, false) AS "statusBookmark" 
    FROM users u
    JOIN users_product up ON (up.ref_id = u.id)
    JOIN users_product_image upi ON (upi.ref_id_product = up.id_product)
    JOIN users_photo_stats ups ON (ups.ref_id_product = up.id_product)
    LEFT JOIN (
      SELECT ref_id_product, action_vote FROM users_interactions_vote
      WHERE ref_id_sender = (SELECT id FROM users WHERE public_id = ${idSender})
    ) uiv ON (uiv.ref_id_product = up.id_product)
    LEFT JOIN (
      SELECT ref_id_product, status, type_bookmark
      FROM users_interactions_bookmark
      WHERE ref_id_sender = (SELECT id FROM users WHERE public_id = ${idSender})
        AND type_bookmark = 'photo'::type_product
    ) uib ON (uib.ref_id_product = up.id_product)
    WHERE u.public_id = ${idTarget} AND up.status = true
    ORDER BY up.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
    `;

  if (!query) return [];

  const queryTotal = await prisma.$queryRaw<{ amount_products: number }[]>`
    SELECT total_image AS amount_products 
    FROM users_stats
    WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${idTarget})
    `;

  const hasMore = offset + limit < Number(queryTotal[0].amount_products);
  const data = camelcaseKeys(query);
  return { data, hasMore };
};

// * LIST CREATOR VIDEO
export const GetListCreatorsVideo = async ({
  idTarget,
  idSender,
  type,
  limit,
  offset,
}: {
  idTarget: string;
  idSender: string;
  type: string;
  limit: number;
  offset: number;
}) => {
  const query = await prisma.$queryRaw<TListCreatorVideo>`
    SELECT upv.ref_id_product AS id_product, upv.description, upv.url, upv.thumbnail_url, upv.duration, upv.hashtag, upv.category, up.created_at,
    COALESCE(uvs.like, 0) AS total_like, COALESCE(uvs.dislike, 0) AS total_dislike, uiv.action_vote::status_action_vote AS status
      FROM users_product_video upv
      JOIN users_product up ON (up.id_product = upv.ref_id_product)
      LEFT JOIN users_video_stats uvs ON (uvs.ref_id_product = up.id_product)
      LEFT JOIN (
        SELECT ref_id_product, action_vote FROM users_interactions_vote
        WHERE ref_id_sender = (SELECT id FROM users WHERE public_id = ${idSender})
      ) uiv ON (uiv.ref_id_product = up.id_product)
    WHERE up.ref_id = (SELECT id FROM users WHERE public_id = ${idTarget}) AND up.type = ${type}::type_product
    ORDER BY up.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
    `;

  const checkAmount = await prisma.$queryRaw<{ amount_video: number }[]>`
    SELECT total_video AS amount_video
    FROM users_stats
    WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${idTarget})
  `;

  const hasMore = offset + limit < Number(checkAmount[0].amount_video);

  const data = camelcaseKeys(query);

  return { data, hasMore };
};



export const GetListCommentPhoto = async ({
  idProduct,
  limit,
  offset,
  typeComment,
}: {
  idProduct: number;
  limit: number;
  offset: number;
  typeComment: "comment";
}) => {
  const query = await prisma.$queryRaw<TListCommentPhoto>`
    SELECT ud.username, uic.body, ct.id_comment, COALESCE(ups.sub_comment, 0)::int AS total_sub_comment, ct.created_at
      FROM comment_threads ct
      LEFT JOIN users_interactions_comment uic ON (uic.ref_id_comment = ct.id_comment)
      JOIN users_description ud ON (ud.ref_id = uic.ref_id_sender)
      LEFT JOIN (
        SELECT ref_id_comment, COALESCE(COUNT(ref_id_comment), 0) AS sub_comment
          FROM sub_comment_threads
          GROUP BY ref_id_comment
      ) ups ON (ups.ref_id_comment = ct.id_comment)
    WHERE ct.ref_id_product = ${idProduct}
      AND ct.type_comment = ${typeComment}::type_comment
    ORDER BY
      ct.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  if (!query) return [];

  const check = await prisma.$queryRaw<{ total_comment: number }[]>`
    SELECT comment AS total_comment
      FROM users_photo_stats
    WHERE ref_id_product = ${idProduct}
  `;

  const hasMore = offset + limit < Number(check[0].total_comment);

  const data = camelcaseKeys(query);

  return { data, hasMore };
};

export const GetListSubCommentPhoto = async({
  idComment,
  limit,
  offset,
  typeComment,
}: {
  idComment: number;
  limit: number;
  offset: number;
  typeComment: "sub_comment";
}) => {
  const query = await prisma.$queryRaw<any>`
    SELECT ud.username, uisc.body, sct.id_sub_comment AS "idSubComment", sct.created_at AS "subCreatedAt"
      FROM sub_comment_threads sct
      LEFT JOIN users_interactions_sub_comment uisc ON (uisc.ref_id_comment = sct.id_sub_comment)
      JOIN users_description ud ON (ud.ref_id = uisc.ref_id_sender)
    WHERE sct.ref_id_comment = ${idComment}
      AND sct.type_comment = ${typeComment}::type_comment
    ORDER BY
      sct.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  if (!query) return [];

  const check = await prisma.$queryRaw<{ total_sub_comment: number }[]>`
    SELECT sub_comment AS total_sub_comment
      FROM users_photo_stats
    WHERE ref_id_product = (SELECT ref_id_product FROM comment_threads WHERE id_comment = ${idComment})
  `;

  const hasMore = offset + limit < Number(check[0].total_sub_comment);

  const data = camelcaseKeys(query);

  return { data, hasMore };
};

// ? ACTIONS
export const PostLikeImage = async (
  id: string,
  refIdProduct: number,
  status: string,
  createdAt: Date
) => {
  return prisma.$transaction(async (tx) => {
    const queryCheck = await prisma.$queryRaw<
      { status: "like" | "dislike" | null }[]
    >`
        SELECT action_vote FROM users_interactions_vote WHERE ref_id_sender = (SELECT id FROM users WHERE public_id = ${id}) AND ref_id_product = ${refIdProduct} LIMIT 1
      `;
    if (queryCheck.length === 0) {
      await tx.$executeRaw`
          INSERT INTO users_interactions_vote
          (created_at, ref_id_product, ref_id_sender, action_vote)
          VALUES (${createdAt}::timestamp, ${refIdProduct},
          (SELECT id FROM users WHERE public_id = ${id}), ${status}::status_action_vote)
        `;
      // ? INSERT IMAGE STATS
      await tx.$executeRaw`
          UPDATE users_photo_stats SET
            "like" = users_photo_stats."like" + 
              CASE WHEN ${status} = 'like' THEN 1 ELSE 0 END,
            dislike = users_photo_stats.dislike + 
              CASE WHEN ${status} = 'dislike' THEN 1 ELSE 0 END
          WHERE ref_id_product = ${refIdProduct}
        `;

      // // ? UPDATE USERS STATS
      // await tx.$executeRaw`
      //     UPDATE users_stats SET
      //       total_like = users_stats.total_like + CASE WHEN ${status} = 'like'
      //     WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${id})
      //   `;
    } else {
      await tx.$executeRaw`
            UPDATE users_interactions_vote SET created_at = ${createdAt}::timestamp, action_vote = ${status}::status_action_vote
            WHERE ref_id_product = ${refIdProduct}
            AND ref_id_sender = (SELECT id FROM users WHERE public_id = ${id})
          `;
      // ! UPDATE IMAGE STATS
      await tx.$executeRaw`
          UPDATE users_photo_stats
          SET
            "like" = "like" + 
              CASE
                WHEN ${status} = 'like' THEN 1
                WHEN ${status} = 'dislike' THEN -1
                ELSE 0
              END,
            "dislike" = "dislike" +
              CASE
                WHEN ${status} = 'dislike' THEN 1
                WHEN ${status} = 'like' THEN -1
                ELSE 0
              END
          WHERE ref_id_product = ${refIdProduct};
        `;
      // // ! UPDATE USERS STATS
      // await tx.$executeRaw`
      //   UPDATE users_stats SET
      //     total_like =
      //       GREATEST(
      //         users_stats.total_like
      //         + CASE
      //             WHEN ${status} = 'like' THEN 1
      //             WHEN ${status} = 'dislike' THEN -1
      //             ELSE 0
      //           END,
      //         0
      //       )
      //   WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${id})
      // `;

      // ! "like" = ("like" + 1) -> nilai saat ini mau ditambah 1
      // ?   UPDATE users_photo_stats
      // ?  SET "like" = "like" + 1
      // ?  WHERE ref_id_product = 10;
      // ! ELSE 0 -> OPTIONAL
    }
  });
};

export const PostFollowUsers = async ({
  idSender,
  idReceiver,
  status,
}: {
  idSender: string;
  idReceiver: string;
  status: number;
}) => {
  return prisma.$transaction(async (tx) => {
    const queryCheck = await tx.$queryRaw<{ ref_id_sender: string }[]>`
      SELECT ref_id_sender FROM users_interactions_followers WHERE ref_id_sender = (SELECT id FROM users WHERE public_id = ${idSender})
    `;

    if (queryCheck.length === 0) {
      await tx.$executeRaw`
        INSERT INTO users_interactions_followers (ref_id_receiver, ref_id_sender, status)
        VALUES ((SELECT id FROM users WHERE public_id = ${idReceiver}), (SELECT id FROM users WHERE public_id = ${idSender}), ${status})
      `;
      // ! USERS STATS
      await tx.$executeRaw`
        INSERT INTO users_stats (ref_id_user, total_followers)
        VALUES ((SELECT id FROM users WHERE public_id = ${idReceiver}),
          CASE WHEN ${status} = true THEN 1 ELSE 0 END
        )
        ON CONFLICT (ref_id_user)
          DO UPDATE SET
          total_followers = users_stats.total_followers + CASE WHEN ${status} = true THEN 1 ELSE 0 END
      `;
    } else {
      await tx.$executeRaw`
        UPDATE users_interactions_followers SET status = ${status}
        WHERE ref_id_sender = (SELECT id FROM users WHERE public_id = ${idSender}) AND ref_id_receiver = (SELECT id FROM users WHERE public_id = ${idReceiver})
      `;
      // ? UPDATE USERS STATS
      await tx.$executeRaw`
        UPDATE users_stats SET 
          total_followers = users_stats.total_followers + 
            CASE 
              WHEN ${status} = true THEN 1
              WHEN ${status} = false THEN -1
            ELSE 0 END
        WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${idReceiver})
      `;
    }
  });
};

export const PostBookmarkUsers = async ({
  idSender,
  idProduct,
  status,
  typeBookmark,
  createdAt,
}: {
  idSender: string;
  idProduct: number;
  status: boolean;
  typeBookmark: string;
  createdAt: Date;
}) => {
  return prisma.$transaction(async (tx) => {
    const check = await tx.$queryRaw<{ ref_id_sender: string }[]>`
      SELECT ref_id_sender FROM users_interactions_bookmark
        WHERE ref_id_sender = (SELECT id FROM users WHERE public_id = ${idSender})
          AND ref_id_product = ${idProduct}
    `;

    // ? INSERT INTERACTION
    if (check.length === 0) {
      await tx.$executeRaw`
        INSERT INTO users_interactions_bookmark (ref_id_product, ref_id_sender, status, type_bookmark, created_at)
        VALUES (${idProduct}, (SELECT id FROM users WHERE public_id = ${idSender}), ${status}, ${typeBookmark}::type_product, ${createdAt}::timestamp)
      `;
    } else {
      await tx.$executeRaw`
        UPDATE users_interactions_bookmark SET
        status = ${status}, created_at = ${createdAt}::timestamp
          WHERE ref_id_product = ${idProduct}
            AND ref_id_sender = (SELECT id FROM users WHERE public_id = ${idSender})
      `;
    }

    // ! UPDATE PRODUCT STATS
    await tx.$executeRaw`
      UPDATE users_photo_stats SET
        bookmark = users_photo_stats.bookmark +
          CASE 
            WHEN ${status} = true THEN 1
            WHEN ${status} = false THEN -1
          ELSE 0
          END
      WHERE ref_id_product = ${idProduct}
    `;
  });
};

export const PostEmailUsers = ({
  subject,
  body,
  idReceiver,
  idSender,
  idEmail,
  status,
  createdAt,
}: {
  subject: string;
  body: string;
  idReceiver: string;
  idSender: string;
  idEmail: number;
  status: boolean;
  createdAt: Date;
}) => {
  return prisma.$transaction(async (tx) => {
    // ! DB email_threads
    const queryCheck = await tx.$queryRaw<{ id_email: number }[]>`
      SELECT id_email FROM email_threads WHERE id_email = ${idEmail}
    `;
    if (queryCheck.length === 0) {
      await tx.$executeRaw`
        INSERT INTO email_threads (id_email, total_email, created_at)
          VALUES (${idEmail}, ${1}, ${createdAt}::timestamp)`;
    } else {
      await tx.$executeRaw`
        UPDATE email_threads SET
          total_email = email_threads.total_email + 1
        WHERE id_email = ${idEmail}`;
    }

    // ? DB interactions
    await tx.$executeRaw`
      INSERT INTO users_interactions_email (ref_id_email, ref_id_sender, ref_id_receiver, subject, body, status_receiver, status_sender, created_at)
        VALUES (${idEmail}, (SELECT id FROM users WHERE public_id = ${idSender}), (SELECT id FROM users WHERE public_id = ${idReceiver}), ${subject}, ${body}, ${false}, ${status}, ${createdAt}::timestamp)`;
  });
};
