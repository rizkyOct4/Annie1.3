import { NextResponse, NextRequest } from "next/server";
import type { GetServerSidePropsContext, NextApiRequest } from "next"


const PublicPath = ({
  pathname,
  role,
  req,
}: {
  pathname: string;
  role: string;
  req: NextApiRequest;
}) => {
  // * Public Path ===========
  const publicPaths = [`/auth-option`, `/category`, `/notification`, `/creators`, "/_next/"];

  if (
    publicPaths.some((path) => pathname.startsWith(path)) &&
    req.method === "GET"
  ) {
    return NextResponse.next();
  }

  if ((role === "guest" || !role) && req.method !== "GET") {
    return NextResponse.redirect(new URL(`/auth-option`, req.url));
  }
};

export { PublicPath };
