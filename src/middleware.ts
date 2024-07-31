import NextAuth from "next-auth"
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig)

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "@/routes"

export default auth((req)  => {
  const {nextUrl} = req
  const isLoggedIn = !!req.auth
  
  const isApiAutRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAutRoute){
    return null; // do not do any action 
  }

  if (isAuthRoute){
    if (isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT))
    }
    return null; // do not do any action 
  }
  if (isPublicRoute){
    return null; // do not do any action 
  }

  
  
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = {
//     matcher: [ "/auth"],
//   }


  //"/((?!api|_next/static|_next/image|favicon.ico).*)",


  export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  };