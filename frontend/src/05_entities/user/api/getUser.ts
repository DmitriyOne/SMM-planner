import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TUser } from "../model/types"

export const getUser = async (id: string, token: string): Promise<TUser> => {
  return fetcher<TUser>(ENDPOINTS.USER_BY_ID(id), "GET", {
    cache: "force-cache",
    token,
  })
}
