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
    `/auth`,
    `/category`,
    `/notification`,
    // `/customize`,
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
      { message: "Unauthorized", redirect: pathname },
      { status: 401 }
    );
  }
};

export { PublicPath };


// todo KONDISIKAN BESOK PROXY LAGI !!!