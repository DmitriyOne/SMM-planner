import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TPost } from "../model"
import { TResponseMessage } from "@/06_shared/api/types"

export const updatePost = async (
  id: number,
  post: Partial<TPost>,
): Promise<TResponseMessage> => {
  return fetcher<TResponseMessage>(ENDPOINTS.POST_UPDATE(id), "PATCH", {
    body: { ...post },
  })
}
