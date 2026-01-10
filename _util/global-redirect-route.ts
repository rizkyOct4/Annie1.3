import { NextRequest, NextResponse } from "next/server";
// import { useRouter } from "next/navigation";

export const GlobalRedirectRoute = ({ id, req }: { id: string; req: NextRequest }) => {
  const referer = req.headers.get("referer") ?? "/";
  const prevPath = referer.split("/").filter(Boolean).at(-1);
  // console.log(prevPath);

  if (!id) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        redirectTo: prevPath,
      },
      { status: 401 }
    );
  }
};

// export const RedirectS = ({ id, req }: { id: string; req: NextRequest }) => {
//   const pathname = req.nextUrl.pathname;

//   if (!id) {
//     return NextResponse.json(
//       {
//         message: "Unauthorized",
//         redirectTo: pathname,
//       },
//       { status: 401 }
//     );
//   }
// };
