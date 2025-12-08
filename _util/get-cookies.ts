import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { TokenHelper } from "@/_lib/tokenHelper";
import GetToken from "@/_lib/middleware/get-token";

const GetCookies = async () => {
//   const queryClient = new QueryClient();
//   const cookieHeader = (await cookies()).toString();
  const token = (await cookies()).get("next-auth.session-token")?.value;
//   const token = (await cookies()).get("access_token")?.value;
//   const { publicId } = (await TokenHelper(token)) || {};
//   return { queryClient, cookieHeader, publicId };
};