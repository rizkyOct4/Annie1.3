import { NextRequest, NextResponse } from "next/server";
import {
  ListItemFolder,
  ItemFolderPhoto,
  ItemFolderVideo,
} from "@/_lib/services/navbar/option/profile/services-content";
import GetToken from "@/_lib/middleware/get-token";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { id } = await GetToken();
    const typeParams = (await params).type;
    const key = req.nextUrl.searchParams.get("key");

    const section = Number(req.nextUrl.searchParams.get("section"));
    const limit = Number(req.nextUrl.searchParams.get("limit"));
    const offset = (section - 1) * limit;

    switch (key) {
      case "listItemFolderPhoto":
      case "listItemFolderVideo": {
        const year = Number(req.nextUrl.searchParams.get("year"));
        const month = Number(req.nextUrl.searchParams.get("month"));
        const output = await ListItemFolder({
          id,
          path: typeParams,
          year,
          month,
          limit,
          offset,
        });
        return NextResponse.json(output);
      }
      case "itemFolderPhoto": {
        const folderName = req.nextUrl.searchParams.get("folder-name") ?? "";
        const result = await ItemFolderPhoto({
          path: typeParams,
          folderName,
          limit,
          offset,
        });
        return NextResponse.json(result);
      }
      case "itemFolderVideo": {
        const folderName = req.nextUrl.searchParams.get("folder-name") ?? "";
        const output = await ItemFolderVideo({
          path: typeParams,
          folderName,
          limit,
          offset,
        });
        return NextResponse.json(output);
      }
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
