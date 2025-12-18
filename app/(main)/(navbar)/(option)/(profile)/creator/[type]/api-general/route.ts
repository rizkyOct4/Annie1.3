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
    const iuProduct = Number(req.nextUrl.searchParams.get("iu-product"));

    // * List Folder Form
    if (typeBtn) {
      const result = await GetListPostFolder(id, typeBtn);
      return NextResponse.json(result);
    }

    if (iuProduct) {
      const result = await GetUpdateImage(iuProduct);
      return NextResponse.json(result);
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
