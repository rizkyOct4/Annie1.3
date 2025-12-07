import { NextRequest, NextResponse } from "next/server";
import ProfilePath from "./_lib/middleware/mid-profile-path";
import { PublicPath } from "./_lib/middleware/mid-public-path";
import GetToken from "./_lib/middleware/get-token";
import type { GetServerSidePropsContext, NextApiRequest } from "next"


const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const { role } = await GetToken(req);
  console.log(`session:`, role);

  // // * 1. Public Path
  // const publicRes = PublicPath({ pathname, role, req });
  // if (publicRes) return publicRes;

  // // * 2. Profile Path (role-based path check)
  // const profileRes = await ProfilePath({ role, pathname, req });
  // if (profileRes) return profileRes;

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: [
    `/(admin|creator)/:path*`,
    `/category/:path*`,
    `/creators/:path*`,
    // ? OPTION BAR ====
    `/notification/:path*`,
  ],
};

//  * 085212635051 (bg dimas)

// todo buat besok SAMA KAU SSG LAGI !!!
// todo JANGAN SIBUK NAMBAH FITUR AJA KAU !! PERBAIKI MIDDLEWARE KAU SAMPAI FIX !!! BUAT SESIMPLE MUNGKIN
// TODO withCredentials -> middleware kau besok kondisikan !! masih PR sama kau

// todo getToken -> masih mentah belum di decode -> MIDDLEWARE
// todo getSession -> data udah siap digunakan di server compoennt
