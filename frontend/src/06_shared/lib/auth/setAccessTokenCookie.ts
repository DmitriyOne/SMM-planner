import { COOKIES, isPromise } from "@/06_shared/config"
import { cookies as getCookies } from "next/headers"

export const setAccessTokenCookie = async (token: string) => {
  const cookies = getCookies()

  let cookieStore

  if (isPromise(cookies)) {
    cookieStore = await cookies
  } else {
    cookieStore = cookies
  }

  cookieStore.set(COOKIES.AUTH.name, token, COOKIES.AUTH.options)
}
