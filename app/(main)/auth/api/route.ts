import { NextRequest, NextResponse } from "next/server";
import { CredentialRegister } from "@/_lib/services/services-auth";

export async function POST(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");

    const { firstName, lastName, email, password, role, gender } =
      await req.json();

    switch (key) {
      case "register": {
        await CredentialRegister({
          firstName,
          lastName,
          email,
          password,
          role,
          gender,
        });
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
