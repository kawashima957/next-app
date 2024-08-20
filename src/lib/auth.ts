// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { getServerSession as originalGetServerSession } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { prisma } from "@/lib/prisma";
// import type { NextAuthOptions } from "next-auth";

// import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma as any), // eslint-disable-line
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID || "",
//       clientSecret: process.env.GOOGLE_SECRET || "",
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       const dbUser = await prisma.user.findFirst({
//         where: { email: token.email },
//       });
//       if (!dbUser) {
//         if (user) {
//           token.id = user?.id;
//         }
//         return token;
//       }
//       return {
//         // id: dbUser.id,
//         name: dbUser.name,
//         email: dbUser.email,
//         // image: dbUser.image,
//       };
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         // session.user.id = token.id as string;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         // session.user.image = token.image;
//       }
//       return session;
//     },
//   },
// };

// export const getServerSession = async () => {
//   // ❌: React.cache で囲んでいない
//   return originalGetServerSession(authOptions);
// };

import { PrismaClient } from "@prisma/client"
import NextAuth, { NextAuthConfig } from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
const prisma = new PrismaClient()
import authConfig from "@/lib/auth.config"

export const config: NextAuthConfig = {
  // https://next-auth.js.org/configuration/options
  // adapter: PrismaAdapter(prisma),
  basePath: "/api/auth/",
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, user, account, profile}) {
      const dbUser = await prisma.user.findFirst({
        where: { email: token.email ?? "" },
      });
      if (dbUser) {
        token.id = dbUser.id; // ユーザーのIDをトークンに含める
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id as string;
      return session;
    }
  },
  ...authConfig
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)