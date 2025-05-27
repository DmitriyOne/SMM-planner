import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TComment } from "../model/types"
import { delay } from "@/06_shared/model/utils"

export const getCommentsByPostId = async (
  postId: string,
): Promise<TComment[]> => {
  await delay(2000)
  return fetcher<TComment[]>(ENDPOINTS.COMMENTS_ALL(postId), "GET", {
    cache: "no-store",
  })
}
