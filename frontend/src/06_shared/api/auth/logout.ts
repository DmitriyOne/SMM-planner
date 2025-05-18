import { ENDPOINTS, fetcher } from "@/06_shared/api"

export const logout = async () => {
  return fetcher(
    ENDPOINTS.LOGOUT,
    "POST",
    {
      cache: "force-cache",
    },
    true,
  )
}
