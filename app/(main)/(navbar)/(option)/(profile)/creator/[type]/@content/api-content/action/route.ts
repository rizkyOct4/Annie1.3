import { NextRequest, NextResponse } from "next/server";
import { PutCloudinary, PutImage } from "@/_lib/services/navbar/option/profile/action/services-btn";
import { ItemFolderDescription } from "@/_lib/navbar/profile/route";
import GetToken from "@/_lib/middleware/get-token";
import {
  PostImageProductCloudinary,
  PostDb,
  GetPostDb,
} from "@/_lib/services/navbar/option/profile/services-post-image";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { id, name } = await GetToken();

    const method = req.nextUrl.searchParams.get("method");
    const typePost = req.nextUrl.searchParams.get("type");

    if (method === "post" && typePost === "photo") {
      const {
        idProduct,
        description,
        imageName,
        imagePath,
        hashtag,
        category,
        type,
        folderName,
        createdAt,
      } = await req.json();
      const webpName = imageName.replace(/\.[^/.]+$/, "") + ".webp";

      const cloudUrl = await PostImageProductCloudinary({
        webpName,
        imagePath,
        username: name,
      });

      await PostDb({
        idProduct,
        id,
        description,
        webpName,
        hashtag,
        category,
        type,
        folderName,
        cloudUrl,
        createdAt,
      });

      const result = await GetPostDb({
        idProduct,
      });

      revalidateTag(`folders-photo-${id}`, "max");
      revalidateTag(`item-folder-photo-${folderName}`, "max");
      revalidateTag(`list-folder-btn-${id}`, "max");

      return NextResponse.json({
        message: "New Post Success",
        result,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const method = req.nextUrl.searchParams.get("method");
    const typePut = req.nextUrl.searchParams.get("type");

    if (method === "put" && typePut === "photo") {
      const {
        iuProduct,
        publicId,
        description,
        imageName,
        imagePath,
        prevImage,
        hashtag,
        category,
        type,
        createdAt,
      } = await req.json();

      const webpName = imageName.replace(/\.[^/.]+$/, "") + ".webp";

      // Update ke database
      const url = await PutCloudinary({
        publicId,
        iuProduct,
        webpName,
        imagePath,
        prevImage,
      });

      await PutImage({
        iuProduct,
        description,
        webpName,
        url,
        hashtag,
        category,
        createdAt,
      });

      const result = await ItemFolderDescription(iuProduct);

      return NextResponse.json({
        message: "Update Success",
        data: result,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
