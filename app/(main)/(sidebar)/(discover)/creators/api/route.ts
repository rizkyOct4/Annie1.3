import { NextRequest, NextResponse } from "next/server";
import { GetAllCreators } from "@/_lib/services/sidebar/discover/creators/services-creators";
// import { TokenHelper } from "@/_lib/tokenHelper";

export async function GET(req: NextRequest) {
  try {
    const sectionPage = Number(req.nextUrl.searchParams.get("section"));
    const limit = Number(req.nextUrl.searchParams.get("limit"));
    const offset = (sectionPage - 1) * limit;

    const result = await GetAllCreators({ limit, offset });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
