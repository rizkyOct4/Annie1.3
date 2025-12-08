import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/_lib/config";
import { Register, CredentialsLogin } from "@/_lib/services/auth";
import { AUTH_SECRET } from "@/_lib/config";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 1, // ? 1 hari -> login bertahan
    updateAge: 60 * 60, // ? refreshh login
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
  // ? jwt -> INI DATA SECRET YG AKAN DIKIRIM KE COOKIES !!!
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // ! user -> credential, profile -> OAuth
      // ? credentials login → user berisi data dari authorize
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.createdAt = user.createdAt;
      }

      // ? OAuth login → user hanya berisi data dasar
      if (account && profile) {
        const fullname = profile?.name || token.name || "";
        const splitName = fullname?.trim().split(" ");
        const firstName = splitName[0];
        const lastName = splitName.slice(1).join(" ");

        const email = token.email ?? profile.email;
        const profilePicture = profile.image ?? "";

        await Register({
          firstName: firstName,
          lastName: lastName,
          email: email,
          fullname: fullname,
          picture: profilePicture,
        });

        token.email = token.email ?? profile.email;
        token.name = token.name ?? profile.name;
        token.profilePicture = profile.image ?? "";
      }

      console.log(token)
      return token;
    },
    // ? INI YG AKAN DIGUNAKNA DI CLIENT !!
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

  // ! TARGET COOKIES KAU !!! -> Ini yang memastikan user login tetap hidup, dan memastikan token tidak dicuri lewat JavaScript.
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
  secret: AUTH_SECRET,
});

export { handler as GET, handler as POST };

// ? TOKEN DARI AUTH.js ??? user -> users sendiri ???
