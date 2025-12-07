import { NextResponse, NextRequest } from "next/server";
import type { GetServerSidePropsContext, NextApiRequest } from "next"


const ProfilePath = async ({
  role,
  pathname,
  req,
}: {
  role: string;
  pathname: string;
  req: NextApiRequest;
}) => {
  try {
    // ? ROLE USERS
    const rolePaths: Record<string, string> = {
      admin: `/admin`,
      creator: `/creator`,
    };

    // ? ROLE SPESIFIC
    if (!pathname.startsWith(rolePaths[role])) {
      return NextResponse.redirect(new URL(`/not-found`, req.url));
    }

    return NextResponse.next();
  } catch (err: any) {
    console.error(err)
    return NextResponse.redirect(new URL(`/auth-option`, req.url));
  }
};

export default ProfilePath;
