import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";

 
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/list', request.url))
// }
