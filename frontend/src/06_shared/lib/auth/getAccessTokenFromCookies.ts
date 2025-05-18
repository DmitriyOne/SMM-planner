import { COOKIES, isPromise } from "@/06_shared/config"
import { cookies as getCookies } from "next/headers"

export const getAccessTokenFromCookies = async (): Promise<string | null> => {
  const cookies = getCookies()

  let cookieStore

  if (isPromise(cookies)) {
    cookieStore = await cookies
  } else {
    cookieStore = cookies
  }

  return cookieStore.get(COOKIES.AUTH.name)?.value || null
}
