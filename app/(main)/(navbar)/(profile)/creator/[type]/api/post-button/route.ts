import { NextRequest, NextResponse } from "next/server";
import { ListPostFolder, PostCloudinary, PostDb, GetPostDb } from "@/_lib/navbar/profile/route";
import { TokenHelper } from "@/_lib/tokenHelper";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value;
    const { publicId } = (await TokenHelper(token)) || {};
    const typeQuery = req.nextUrl.searchParams.get("typeBtn");

    // * List Folder Form
    if (typeQuery) {
      const result = await ListPostFolder(publicId, typeQuery);
      return NextResponse.json(result);
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const method = req.nextUrl.searchParams.get("method");
    const typePost = req.nextUrl.searchParams.get("type");

    const body = await req.json();
    if (method === "post" && typePost === "photo") {
      const {
        iuProduct,
        publicId,
        description,
        imageName,
        imagePath,
        hashtags,
        categories,
        type,
        folderName,
        createdAt,
      } = body;
      const webpName = imageName.replace(/\.[^/.]+$/, "") + ".webp";

      const cloudUrl = await PostCloudinary({
        webpName,
        imagePath,
        publicId,
      });

      await PostDb({
        iuProduct,
        publicId,
        description,
        webpName,
        hashtags,
        categories,
        type,
        folderName,
        cloudUrl,
        createdAt,
      });

      const result = await GetPostDb({
        iuProduct,
      });

      return NextResponse.json({
        message: "New Post Success",
        data: result,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
