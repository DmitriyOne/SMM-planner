import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TTag } from "@/06_shared/ui/tag/model/types"

export const createTags = async (title: string): Promise<TTag> => {
  return fetcher<TTag>(ENDPOINTS.TAG_CREATE, "POST", {
    body: { title },
  })
}
