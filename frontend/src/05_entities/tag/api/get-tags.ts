import { TTag } from "@/05_entities/tag/model/types"
import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { delay } from "@/06_shared/model/utils"

export const getTags = async (): Promise<TTag[]> => {
  // TODO: remove delay
  await delay(2000)
  return fetcher<TTag[]>(ENDPOINTS.TAGS_ALL)
}
