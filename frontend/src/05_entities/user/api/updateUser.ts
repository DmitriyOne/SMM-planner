import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TUpdatableUserData } from "../model/types"
import { TResponseMessage } from "@/06_shared/api/types"

export const updateUser = async (
  token: string,
  id: string,
  user: TUpdatableUserData,
): Promise<TResponseMessage> => {
  return fetcher<TResponseMessage>(ENDPOINTS.USER_UPDATE(id), "PATCH", {
    cache: "no-store",
    body: { ...user },
    token,
  })
}
