import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TChangePasswordDTO } from "../model/types"
import { TResponseMessage } from "@/06_shared/api/types"

export const changePassword = async (
  token: string,
  body: TChangePasswordDTO,
): Promise<TResponseMessage> => {
  return fetcher<TResponseMessage>(ENDPOINTS.USER_CHANGE_PASSWORD, "PATCH", {
    cache: "no-store",
    body,
    token,
  })
}
