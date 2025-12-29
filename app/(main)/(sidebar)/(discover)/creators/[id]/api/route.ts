import { NextRequest, NextResponse } from "next/server";
import {
  GetTargetCreatorsDescription,
  GetListCreatorsProduct,
  PostLikeImage,
} from "@/_lib/services/sidebar/discover/creators/services-creators";
import GetToken from "@/_lib/middleware/get-token";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const idTargetCreator = (await params).id;
    const { id: idSender } = await GetToken();

    const section = Number(req.nextUrl.searchParams.get("section"));
    const limit = Number(req.nextUrl.searchParams.get("limit"));
    const offset = (section - 1) * limit;

    if (idTargetCreator && !section) {
      const resultdesc = await GetTargetCreatorsDescription({
        idTargetCreator: idTargetCreator,
      });
      return NextResponse.json(resultdesc);
    }

    if (section && limit) {
      const result = await GetListCreatorsProduct({
        idTarget: idTargetCreator,
        idSender: idSender,
        limit: limit,
        offset: offset,
      });
      return NextResponse.json(result);
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const action = req.nextUrl.searchParams.get("action");
    const { id } = await GetToken();

    if (action === "post") {
      const { idVote, refIdReceiver, refIdProduct, status, createdAt } =
        await req.json();

      await PostLikeImage(
        id,
        idVote,
        refIdReceiver,
        refIdProduct,
        status,
        createdAt
      );

      return NextResponse.json({ success: true });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
