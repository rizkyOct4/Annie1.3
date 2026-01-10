import { NextResponse, NextRequest } from "next/server";

const PublicPath = async ({
  pathname,
  role,
  req,
}: {
  pathname: string;
  role: string;
  req: NextRequest;
}) => {
  // * Public Path ===========
  const publicPaths = [
    `/`,
    `/auth`,
    `/category`,
    `/report`,
    `/legal`,
    `/getting-started`,
    `/creators`,
    "/_next/",
  ];

  if (
    publicPaths.some((path) => pathname.startsWith(path)) &&
    req.method === "GET"
  ) {
    return NextResponse.next();
  }
  if (!role && req.method !== "GET") {
    return NextResponse.json(
      {
        message: "Unauthorized",
        redirectTo: pathname.replace("/api", ""),
      },
      { status: 401 }
    );
  }
  if (role) return NextResponse.next();
};

export { PublicPath };
