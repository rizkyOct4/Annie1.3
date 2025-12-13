import { prisma } from "@/_lib/db";
import camelcaseKeys from "camelcase-keys";
import type { TGetCustomize } from "./type-customize";

export const GetCustomize = async ({ publicId }: { publicId: string }) => {
  const query = await prisma.$queryRaw<TGetCustomize[]>`
        SELECT
          ud.username,
          COALESCE(ud.biodata, '') AS biodata,
          COALESCE(ud.gender, 'alien') AS gender,
          COALESCE(ud.phone_number, 0) AS phone_number,
          COALESCE(ud.location, '') AS location,
          COALESCE(ud.picture, '') AS picture,
          COALESCE(ud.social_link, '{}') AS social_link
        FROM users u
        LEFT JOIN users_description ud ON (ud.tar_iu = u.iu)
        WHERE u.public_id = ${publicId}::uuid
    `;
  return camelcaseKeys(query);
};
