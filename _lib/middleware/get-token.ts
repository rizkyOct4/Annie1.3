import { getToken } from "next-auth/jwt";
import { AUTH_SECRET } from "../config";
import { NextRequest } from "next/server";
import type { NextApiRequest } from "next"

const GetToken = async (req: NextApiRequest) => {
  const session = await getToken({ req, secret: AUTH_SECRET }); // ! Ambil token JWT dari cookies
  console.log(`eeee`, session);

  return {
    id: session?.id as string,
    name: session?.name as string,
    role: session?.role as string,
  };
};

export default GetToken;

// ? import { NextApiRequest, NextApiResponse } from "next"; -> ini di route handler


// todo AMBIL COOKIES DARI PAGE.TSX -> BUT REQ: ????
// todo PASTIKAN REQ: TYPE PARAMSNYA APA !!!
// todo TARGET COOKIES KAU DARI AUTHENTICATION !!
// todo PASTIKAN PAS SEMUA AUTH KAU !! 