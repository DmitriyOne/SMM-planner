import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TUpdatablePostData } from "../model/types"
import { TResponseMessage } from "@/06_shared/api/types"

export const updatePost = async (
  id: number,
  post: TUpdatablePostData,
): Promise<TResponseMessage> => {
  return fetcher<TResponseMessage>(ENDPOINTS.POST_UPDATE(id), "PATCH", {
    body: { ...post },
  })
}
