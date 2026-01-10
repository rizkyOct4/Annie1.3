import { NextRequest, NextResponse } from "next/server";
import { PublicPath } from "./_lib/middleware/mid-public-path";
import ProfilePath from "./_lib/middleware/mid-profile-path";
import GetToken from "./_lib/middleware/get-token";

const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const { role } = await GetToken();

  // const referer = req.headers.get("referer") ?? "/"; // ? init dari BROWSER !! liat di NETWORK !!
  // const currentPath = referer ? new URL(referer).pathname : "/";
  // console.log(`Proxy:`,currentPath);

  // // * 1. Public Path
  // const publicRes = await PublicPath({ pathname, role, req });
  // if (publicRes) return publicRes;

  // * 2. Profile Path (role-based path check)
  const profileRes = await ProfilePath({ role, pathname, req });
  if (profileRes) return profileRes;

  return NextResponse.next();
};

export default proxy;

export const config = {
  matcher: [
    `/(admin|creator)/:path*`,
    `/category/:path*`,
    `/creators/:path*`,
    `/customize/:path*`,
    // `/:path*`,
    // `/:getting-started`,
    // `/:legal`,
    // `/:report`,
  ],
};

// export const config = {
//   matcher: [
//     `/((?!api|auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)`,
//   ],
// };
