// app/(main)/(navbar)/(option)/notification/page.tsx

import { getToken } from "next-auth/jwt"; // Mengimpor getToken dari next-auth
import { cookies } from 'next/headers'; // Mengimpor cookies dari next/headers
// import TestNotification from './TestNotification';

// Server Component
const Page = async () => {
  // Ambil cookies dari request header (di server)
  
  const token = (await cookies()).get("next-auth.session-token")?.value;

  // Jika Anda menggunakan JWT dengan NextAuth.js
  const session = await getToken({ req: { cookies: { 'next-auth.session-token': token } }, secret: process.env.AUTH_SECRET });

  // Ambil id, name, dan role dari session
  const { id, name, role } = session || {};

  console.log("User ID:", id);  // Debugging untuk memastikan token berhasil diambil

  // return (
  //   <div>
  //     <TestNotification />
  //     <p>Welcome, {name}</p>
  //   </div>
  // );
};

export default Page;
