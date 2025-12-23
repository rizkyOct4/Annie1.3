import { NextRequest, NextResponse } from "next/server";
// import { TokenHelper } from "@/_lib/tokenHelper";
// import { ItemFolderDescription } from "@/_lib/services/navbar/profile/panel-service";
import GetToken from "@/_lib/middleware/get-token";
import { ItemFolderDescription } from "@/_lib/services/navbar/option/profile/services-panel";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ panel: string }> }
) {
  try {
    const { id } = await GetToken();
    const key = req.nextUrl.searchParams.get("key");
    const pathUrl = (await params).panel;

    const pathFolderName = req.nextUrl.searchParams.get("folder-name") ?? "";
    const idProduct = Number(req.nextUrl.searchParams.get("id"));

    switch (key) {
      case "description": {
        const result = await ItemFolderDescription(idProduct, id);
        return NextResponse.json(result);
      }
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
