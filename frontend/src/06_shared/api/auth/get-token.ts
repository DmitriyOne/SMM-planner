import { ENDPOINTS, fetcher } from "@/06_shared/api"

export const getToken = async (): Promise<string> => {
  const response = await fetcher<{ token: string }>(
    ENDPOINTS.GET_TOKEN,
    "GET",
    { cache: "no-store" },
    true,
  )

  return response.token
}
