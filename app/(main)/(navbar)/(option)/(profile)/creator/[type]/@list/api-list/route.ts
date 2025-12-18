import { NextRequest, NextResponse } from "next/server";
import { ListFolderPhoto } from "@/_lib/services/navbar/option/profile/services-list-folder";
import GetToken from "@/_lib/middleware/get-token";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { id } = await GetToken();
    const pathUrl = (await params).type;

    const section = Number(req.nextUrl.searchParams.get("section"));
    const limit = Number(req.nextUrl.searchParams.get("limit"));
    const offset = (section - 1) * limit;

    if (pathUrl) {
      const result = await ListFolderPhoto({
        id,
        pathUrl,
        limit,
        offset,
      });
      return NextResponse.json(result);
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
