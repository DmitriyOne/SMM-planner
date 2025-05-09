import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TTag } from "@/06_shared/ui/tag/model/types"

export const getTags = async (): Promise<TTag[]> => {
  return fetcher<TTag[]>(ENDPOINTS.TAGS_ALL)
}
