import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TResponseMessage } from "@/06_shared/api/types"

export const deletePost = async (id: string): Promise<TResponseMessage> => {
  return fetcher<TResponseMessage>(ENDPOINTS.POST_DELETE(id), "DELETE")
}
