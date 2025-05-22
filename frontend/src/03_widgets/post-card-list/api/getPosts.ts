import { TPost } from "@/05_entities/post/model/types"
import { ENDPOINTS, fetcher } from "@/06_shared/api"

type TPostDTO = Partial<Pick<TPost, "isPublish" | "isApproved">>

export const getPosts = async ({
  isPublish,
  isApproved,
}: TPostDTO): Promise<TPost[]> => {
  return fetcher<TPost[]>(ENDPOINTS.POSTS_ALL, "POST", {
    body: { isPublish, isApproved },
    cache: "force-cache",
  })
}
