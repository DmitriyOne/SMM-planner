import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TResponseMessage } from "@/06_shared/api/types"

export const deleteTag = async (
  token: string,
  id: string,
): Promise<TResponseMessage> => {
  return fetcher<TResponseMessage>(ENDPOINTS.TAG_DELETE(id), "DELETE", {
    token,
  })
}
