import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TComment } from "../model/types"

export const getCommentsByPostId = async (
  postId: string,
): Promise<TComment[]> => {
  return fetcher<TComment[]>(ENDPOINTS.COMMENTS_ALL(postId), "GET", {
    cache: "no-store",
  })
}
