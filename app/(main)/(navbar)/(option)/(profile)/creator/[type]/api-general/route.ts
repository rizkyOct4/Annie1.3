import { NextRequest, NextResponse } from "next/server";
import {
  GetListPostFolder,
  GetUpdateImage,
} from "@/_lib/services/navbar/option/profile/action/services-btn";
import GetToken from "@/_lib/middleware/get-token";

export async function GET(req: NextRequest) {
  try {
    // const token = req.cookies.get("access_token")?.value;
    const { id } = await GetToken();
    const typeBtn = req.nextUrl.searchParams.get("type-btn");
    const idProduct = Number(req.nextUrl.searchParams.get("id-product"));

    // * List Folder Form
    if (typeBtn) {
      const result = await GetListPostFolder(id, typeBtn);
      return NextResponse.json(result);
    }

    if (idProduct) {
      const result = await GetUpdateImage(id, idProduct);
      return NextResponse.json(result);
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
