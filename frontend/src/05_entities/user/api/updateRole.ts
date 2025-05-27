import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TResponseMessage } from "@/06_shared/api/types"
import { ERole } from "@/06_shared/model/enum"

export const updateRole = async (
  token: string,
  userId: string,
  role: ERole,
): Promise<TResponseMessage> => {
  return fetcher<TResponseMessage>(
    ENDPOINTS.USER_UPDATE_ROLE(userId),
    "PATCH",
    {
      cache: "no-store",
      body: { role },
      token,
    },
  )
}
