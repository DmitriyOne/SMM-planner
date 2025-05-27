import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TPost } from "../model/types"
import { delay } from "@/06_shared/model/utils"

export const getPostsByTagId = async (tagId: string): Promise<TPost[]> => {
  await delay(2000)
  return fetcher<TPost[]>(ENDPOINTS.POSTS_BY_TAG_ID(tagId))
}
