import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TTag } from "@/06_shared/ui/tag/model/types"

export const updateTag = async (
  token: string,
  id: string,
  title: string,
): Promise<TTag> => {
  return fetcher<TTag>(ENDPOINTS.TAG_UPDATE(id), "PATCH", {
    body: { title },
    token,
  })
}
