import { NextRequest, NextResponse } from "next/server";
import GetToken from "@/_lib/middleware/get-token";
import { GetListCommentPhoto } from "@/_lib/services/sidebar/discover/creators/services-creators";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const idTarget = (await params).id;
    const { id: idSender } = await GetToken();

    const key = req.nextUrl.searchParams.get("key");
    const idProduct = Number(req.nextUrl.searchParams.get("id-product"));
    const section = Number(req.nextUrl.searchParams.get("section"));
    const limit = Number(req.nextUrl.searchParams.get("limit"));
    const offset = (section - 1) * limit;

    switch (key) {
      case "photo": {
        const output = await GetListCommentPhoto({
          idProduct,
          limit,
          offset,
          typeComment: key,
        });
        return NextResponse.json(output);
        //
      }
      //   case "video": {
      //     const result = await GetListCreatorsVideo({
      //       idTarget: idTarget,
      //       idSender: idSender,
      //       type: key,
      //       limit: limit,
      //       offset: offset,
      //     });
      //     return NextResponse.json(result);
      //   }
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
