import { NextRequest, NextResponse } from "next/server";
import { Register} from "@/_lib/navbar/auth/route";

export async function POST(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");

    const body = await req.json();
    const { firstName, lastName, email, password, role } = body;

    switch (key) {
      case "register": {
        await Register({ firstName, lastName, email, password, role });
        return NextResponse.json({
          message: "Register Success",
        });
      }
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}


// todo PERBAIKI SAMA KAU MIDDLEWARE !! DARI PATH /NOTIFICATION LOGIN BERMASALAH !! FIXKAN BESOK !!
// EDM Relax #4】Chill & Focus Lo-Fi EDM 🎧 Background Music for Study, Work & Everyday Moments