import { NextRequest, NextResponse } from "next/server"
import { Headers, HeadersValue } from "./src/06_shared/api/headers"
import { HttpMessage, HttpStatusCode } from "./src/06_shared/api/http"
import { AUTH_MESSAGE } from "@/06_shared/config"
import { getAccessTokenFromCookies } from "@/06_shared/lib/auth"
import {
  paths,
  protectedRoutes,
  publicRoutes,
} from "@/06_shared/config/routing"
import { matchesRoutePattern } from "@/06_shared/model/utils"

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const path = url.pathname
  const fullUrl = url.origin + path

  // 1. BASIC AUTH
  const authHeader = req.headers.get(Headers.AUTHORIZATION)

  if (!authHeader) {
    return new NextResponse(HttpMessage.UNAUTHORIZED, {
      status: HttpStatusCode.UNAUTHORIZED,
      headers: {
        [Headers.WWW_AUTHENTICATE]: HeadersValue.WWW_AUTHENTICATE_BASIC,
      },
    })
  }

  const base64Credentials = authHeader.split(" ")[1]
  const credentials = atob(base64Credentials).split(":")
  const [username, password] = credentials

  const validUsername = process.env.BASIC_AUTH_USERNAME
  const validPassword = process.env.BASIC_AUTH_PASSWORD

  if (username !== validUsername || password !== validPassword) {
    // eslint-disable-next-line no-console
    console.warn(AUTH_MESSAGE.INVALID_DATA(username, password))

    return new NextResponse(HttpMessage.UNAUTHORIZED, {
      status: HttpStatusCode.UNAUTHORIZED,
      headers: {
        [Headers.WWW_AUTHENTICATE]: HeadersValue.WWW_AUTHENTICATE_BASIC,
      },
    })
  }

  // 2. ACCESS TOKEN AUTH
  const token = await getAccessTokenFromCookies()

  const isProtected = protectedRoutes.some((route) =>
    matchesRoutePattern(route, fullUrl),
  )
  const isPublic = publicRoutes.some((route) =>
    matchesRoutePattern(route, fullUrl),
  )

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(paths.login, req.url))
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL(paths.profile, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|.*\\.(?:png|jpg|jpeg|svg|ico|webmanifest|manifest|json)).*)"],
}
