import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TUser } from "../model/types"

export const getUser = async (token: string): Promise<TUser> => {
  return fetcher<TUser>(ENDPOINTS.USER_ME, "GET", {
    cache: "force-cache",
    token,
  })
}
