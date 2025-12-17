import { NextRequest, NextResponse } from "next/server";
import { TokenHelper } from "@/_lib/tokenHelper";
import { ItemFolderDescription } from "@/_lib/services/navbar/profile/panel-service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ panel: string }> }
) {
  try {
    const token = req.cookies.get("access_token")?.value;
    const { publicId } = (await TokenHelper(token)) || {};
    const key = req.nextUrl.searchParams.get("key");
    const pathUrl = (await params).panel;

    const pathFolderName = req.nextUrl.searchParams.get("folder-name") ?? "";
    const id = Number(req.nextUrl.searchParams.get("id"));

    switch (key) {
      case "description": {
        const result = await ItemFolderDescription(id);
        return NextResponse.json(result);
      }
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
