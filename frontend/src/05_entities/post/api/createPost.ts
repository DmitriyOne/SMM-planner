import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TPost, TPostCreateBody } from "../model/types"

export const createPost = async (body: TPostCreateBody): Promise<TPost> => {
  return fetcher<TPost>(ENDPOINTS.POSTS_CREATE, "POST", {
    cache: "force-cache",
    body,
  })
}
