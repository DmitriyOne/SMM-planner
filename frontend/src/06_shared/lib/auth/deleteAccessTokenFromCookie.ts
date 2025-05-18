import { COOKIES, isPromise } from "@/06_shared/config"
import { cookies as getCookies } from "next/headers"

export const deleteAccessTokenFromCookie = async () => {
  const cookies = getCookies()
  const cookieStore = isPromise(cookies) ? await cookies : cookies
  cookieStore.delete(COOKIES.AUTH.name)
}
