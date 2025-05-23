import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TPost, TPostCreateBody } from "../model/types"

export const createPost = async (
  token: string,
  body: TPostCreateBody,
): Promise<TPost> => {
  return fetcher<TPost>(ENDPOINTS.POSTS_CREATE, "POST", {
    cache: "no-cache",
    body,
    token,
  })
}
