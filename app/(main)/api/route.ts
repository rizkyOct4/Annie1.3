import { NextRequest, NextResponse } from "next/server";
import GetToken from "@/_lib/middleware/get-token";
import { GetProfileUser } from "@/_lib/services/services-auth";
import { PostInterestUser } from "@/_lib/services/interest/services-interest";

export async function GET() {
  try {
    const { id } = await GetToken();

    const output = await GetProfileUser({ id });
    return NextResponse.json(output);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id } = await GetToken();

    const { interest, updatedAt } = await req.json();

    const output = await PostInterestUser({ idSender: id, interest, updatedAt });
    return NextResponse.json(output);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
