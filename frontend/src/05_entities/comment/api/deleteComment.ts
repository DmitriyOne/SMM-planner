import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TResponseMessage } from "@/06_shared/api/types"

export const deleteComment = async (
  token: string,
  postId: string,
  commentId: string,
): Promise<TResponseMessage> => {
  return fetcher<TResponseMessage>(
    ENDPOINTS.COMMENT_DELETE(postId, commentId),
    "DELETE",
    {
      cache: "no-store",
      token,
    },
  )
}
