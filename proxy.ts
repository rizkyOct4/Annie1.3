import { NextRequest, NextResponse } from "next/server";
import { PublicPath } from "./_lib/middleware/mid-public-path";
import ProfilePath from "./_lib/middleware/mid-profile-path";
import GetToken from "./_lib/middleware/get-token";

const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const { role } = await GetToken();

  // * 1. Public Path
  const publicRes = PublicPath({ pathname, role, req });
  if (publicRes) return publicRes;

  // * 2. Profile Path (role-based path check)
  const profileRes = await ProfilePath({ role, pathname, req });
  if (profileRes) return profileRes;

  return NextResponse.next();
};

export default proxy;

export const config = {
  matcher: [
    `/(admin|creator)/:path*`,
    `/category/:path*`,
    `/creators/:path*`,
    // ? OPTION BAR ====
    `/notification/:path*`,
    `/customize/:path*`,
  ],
};

//  * 085212635051 (bg dimas)

// todo buat besok SAMA KAU SSG LAGI !!!
// todo JANGAN SIBUK NAMBAH FITUR AJA KAU !! PERBAIKI MIDDLEWARE KAU SAMPAI FIX !!! BUAT SESIMPLE MUNGKIN
// TODO withCredentials -> middleware kau besok kondisikan !! masih PR sama kau

// todo getToken -> masih mentah belum di decode -> MIDDLEWARE
// todo getSession -> data udah siap digunakan di server compoennt

// todo SECURITY UNTUK HTTPS REQUEST, BUAT DI MIDDLEWATE + ROUTE HANDLER !!!
// todo SECURITY KAU !! BUAT URL PATH KAU GENERAL AJA, JANGAN KASIH ID SPESIFIK USER !!
// todo buat SPESIFIKASI DATA mengerucut ke route handler kau !!
// todo liat semua fetching url kau !! jangan kasih id SECRET !!! PERBAIKI BESOK !!
// ! ) di SERVER (Route Handler):
// ! Server tidak percaya apapun dari client, tetapi mengambil:
// ! const { id } = await GetToken();
// ! 2) Horizontal Privilege Escalation (BOLA)
// ! Tidak bisa, karena data diambil based on token, bukan param

// ! RATE LIMIT -> REDIS !!! CARI SAMA KAU !! BUT SOON !!
