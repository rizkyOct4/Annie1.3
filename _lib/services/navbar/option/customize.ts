import { prisma } from "@/_lib/db";
import camelcaseKeys from "camelcase-keys";
import type { TGetCustomize } from "./type-customize";

export const GetCustomize = async ({ publicId }: { publicId: string }) => {
  const query = await prisma.$queryRaw<TGetCustomize[]>`
        SELECT
          ud.username,
          ud.biodata,
          ud.gender,
          ud.phone_number,
          ud.location,
          ud.picture,
          ud.social_link
        FROM users u
        LEFT JOIN users_description ud ON (ud.tar_iu = u.iu)
        WHERE u.public_id = ${publicId}::uuid
    `;
  return camelcaseKeys(query);
};

export const PostCustomize = () => {
  return;
};
