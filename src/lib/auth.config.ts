import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  // callbacks: {
  //   authorized({request, auth}) {
  //       try {
  //           const {pathname} = request.nextUrl;
  //           if (pathname === "/") return !!auth;
  //           return true;
  //       } catch (err) {
  //           console.log(err);
  //       }
  // }
  // },
} satisfies NextAuthConfig;
