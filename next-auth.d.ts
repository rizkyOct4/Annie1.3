import NextAuth from "next-auth";

declare module "next-auth" {
  // ?Session interface → untuk object yang dikirim ke client via useSession()
  interface Session {
    user: {
      id: string;
      image: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
    };
  }

  // ? User interface → untuk object user yang dikembalikan authorize() atau OAuth provider
  interface User {
    id: string;
    role: string;
    createdAt: string;
  }

  // ? JWT interface → untuk token yang disimpan di cookie (server)
  interface JWT {
    id: string;
    role: string;
    createdAt: string;
  }
}
