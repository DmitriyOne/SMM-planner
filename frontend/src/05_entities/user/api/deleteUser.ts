import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TResponseMessage } from "@/06_shared/api/types"

export const deleteUser = async (
  token: string,
  id: string,
): Promise<TResponseMessage> => {
  return fetcher<TResponseMessage>(ENDPOINTS.USER_DELETE(id), "DELETE", {
    cache: "no-store",
    token,
  })
}
