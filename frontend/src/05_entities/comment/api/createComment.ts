import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TComment, TCreateComment } from "../model/types"

export const createComment = async (
  token: string,
  postId: string,
  body: TCreateComment,
): Promise<TComment> => {
  return fetcher<TComment>(ENDPOINTS.COMMENT_CREATE(postId), "POST", {
    cache: "no-cache",
    body,
    token,
  })
}
