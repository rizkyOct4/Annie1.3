import { getToken } from "next-auth/jwt";
import { AUTH_SECRET } from "../config";
import { cookies } from "next/headers"; // Mengimpor cookies dari next/headers
import { QueryClient } from "@tanstack/react-query";

const GetToken = async () => {
  const queryClient = new QueryClient();

  const token = (await cookies()).get("next-auth.session-token")?.value;
  const session = await getToken({
    req: { cookies: { "next-auth.session-token": token } },
    secret: AUTH_SECRET,
  }); // ! Ambil token JWT dari cookies

  return {
    id: session?.id as string,
    name: session?.name as string,
    role: session?.role as string,
    queryClient: queryClient as any,
  };
};

export default GetToken;

// ? import { NextApiRequest, NextApiResponse } from "next"; -> ini di route handler

// todo AMBIL COOKIES DARI PAGE.TSX -> BUT REQ: ????
// todo PASTIKAN REQ: TYPE PARAMSNYA APA !!!
// todo TARGET COOKIES KAU DARI AUTHENTICATION !!
// todo PASTIKAN PAS SEMUA AUTH KAU !!

// todo penggunaan COOKIES di https request -> public kasih cookies !! private GET ga perlu, tapi pastikan sudah dilindungi middleware
// todo POST, PUT, DEL HARUS PAKAI COOKIES -> PRIVATE / PUBLIC HARUS PAKAI !!
