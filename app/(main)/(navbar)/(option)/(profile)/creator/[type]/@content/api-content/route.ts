import { NextRequest, NextResponse } from "next/server";
// import {
//   ListItemFolderPhoto,
//   ItemFolderPhoto,
// } from "@/_lib/services/navbar/profile/item-folder-service";
import { ListItemFolderPhoto, ItemFolderPhoto } from "@/_lib/services/navbar/option/profile/services-content";
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
      case "listItemFolderPhoto": {
        const year = Number(req.nextUrl.searchParams.get("year"));
        const month = Number(req.nextUrl.searchParams.get("month"));
        const itemFolder = await ListItemFolderPhoto({
          id,
          path: typeParams,
          year,
          month,
          limit,
          offset,
        });
        return NextResponse.json(itemFolder);
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
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
