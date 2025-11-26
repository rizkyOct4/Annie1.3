import { NextRequest, NextResponse } from "next/server";
import { TokenHelper } from "@/_lib/tokenHelper";
import {
  ListItemFolderPhoto,
  ItemFolderPhoto,
} from "@/_lib/services/navbar/profile/item-folder-service";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ type: string }> }
// ) {
//   try {
//     const token = req.cookies.get("access_token")?.value;
//     const { publicId } = (await TokenHelper(token)) || {};
//     const typeParams = (await params).type;

//     const folderName = req.nextUrl.searchParams.get("folderName");
//     const id = Number(req.nextUrl.searchParams.get("id"));

//     const section = Number(req.nextUrl.searchParams.get("section"));
//     const limit = Number(req.nextUrl.searchParams.get("limit"));
//     const offset = (section - 1) * limit;

//     // ? List Folder Photo
//     if (typeParams && !folderName && !id) {
//       const listData = await ListFolder(typeParams, publicId, limit, offset);
//       return NextResponse.json(listData);
//     }
//     if (folderName && !id) {
//       const itemData = await ItemFolder(
//         typeParams,
//         publicId,
//         folderName,
//         limit,
//         offset
//       );
//       return NextResponse.json(itemData);
//     }
//     if (id) {
//       const result = await ItemFolderDescription(id);
//       return NextResponse.json(result);
//     }
//   } catch (err: any) {
//     return NextResponse.json({ message: err.message }, { status: 500 });
//   }
// }

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const token = req.cookies.get("access_token")?.value;
    const { publicId } = (await TokenHelper(token)) || {};
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
          publicId,
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
