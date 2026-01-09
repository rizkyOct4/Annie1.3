import { prisma } from "@/_lib/db";
import camelcaseKeys from "camelcase-keys";

export const PostInterestUser = async ({
  idSender,
  interest,
  updatedAt,
}: {
  idSender: string | undefined;
  interest: string[];
  updatedAt: Date;
}) => {
  return prisma.$transaction(async (tx) => {
    const queryCheck = await tx.$queryRaw<{ interest: string[] }[]>`
        SELECT interest 
          FROM users_description
        WHERE ref_id = (SELECT id FROM users WHERE public_id = ${idSender})
    `;
    if (queryCheck.length === 0) {
      await tx.$executeRaw`
            INSERT INTO users_description (interest, updated_at)
            VALUES (${interest}::varchar[], ${updatedAt}::timestamp)
            WHERE ref_id = (SELECT id FROM users WHERE public_id = ${idSender})
        `;
    } else {
      await tx.$executeRaw`
            UPDATE users_description SET
                interest = ${interest}::varchar[], updated_at = ${updatedAt}::timestamp
            WHERE ref_id = (SELECT id FROM users WHERE public_id = ${idSender})
        `;
    }
  });
};


// todo update interest kau masih bug !! kondisikan besik !!!
// todo PROXY KAU FIXKAN !!