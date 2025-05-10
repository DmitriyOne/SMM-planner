import { NextRequest, NextResponse } from "next/server"
import { Headers, HeadersValue } from "./src/06_shared/api/headers"
import { HttpMessage, HttpStatusCode } from "./src/06_shared/api/http"
import { AUTH_MESSAGE } from "@/06_shared/config"

export function middleware(req: NextRequest) {
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

  return NextResponse.next()
}
