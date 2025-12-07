import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/_lib/config";
import { CredentialsLogin } from "@/_lib/services/auth";
// import { authConfig } from "@/auth.config";

const handler = NextAuth({
  session: {
   strategy: 'jwt',
  },
  providers: [
    Credentials({
      name: "Credentials",
      // ? credentials -> ini parameter dari login form kau !!!
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          return await CredentialsLogin({
            email: credentials.email,
            password: credentials.password,
          });
        } catch (err: any) {
          throw new Error(err?.message || "Login failed");
        }
      },
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // ? WHAT ABOUT THIS ?? IDK ??!!
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // credentials login → user berisi data dari authorize
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.createdAt = user.createdAt;
      }

      // ? OAuth login → user hanya berisi data dasar
      if (account && profile) {
        token.email = token.email ?? profile.email;
        token.name = token.name ?? profile.name;
        token.profilePicture = profile.image ?? "";
      }

    //   console.log(token)

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.createdAt = token.createdAt as string;
      }
      return session;
    },
  },

  // ! TARGET COOKIES KAU !!!
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // `secure` harus true pada HTTPS
        path: "/",
      },
    },
  },
//   secret: process.env.AUTH_SECRET, 
});

export { handler as GET, handler as POST};

// ? TOKEN DARI AUTH.js ??? user -> users sendiri ???
