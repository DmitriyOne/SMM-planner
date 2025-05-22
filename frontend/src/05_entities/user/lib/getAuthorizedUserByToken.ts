import { getAccessTokenFromCookies } from "@/06_shared/lib/auth"
import { getUser } from "../api"
import { TUser } from "../model/types"

export const getAuthorizedUserByToken = async (): Promise<TUser | null> => {
  const token = await getAccessTokenFromCookies()
  try {
    const user = token ? await getUser(token) : null
    return user
  } catch {
    return null
  }
}
