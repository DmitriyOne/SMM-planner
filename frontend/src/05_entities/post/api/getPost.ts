import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TPost } from "../model/types"

export const getPost = async (id: string): Promise<TPost> => {
  return fetcher<TPost>(ENDPOINTS.POST_BY_ID(id), "GET", {
    next: { revalidate: 60 },
  })
}
