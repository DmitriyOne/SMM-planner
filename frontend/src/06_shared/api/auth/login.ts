import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TAuthResponse, TLoginBody } from "../types"

export const login = async (body: TLoginBody): Promise<TAuthResponse> => {
  return fetcher<TAuthResponse>(ENDPOINTS.LOGIN, "POST", {
    cache: "no-store",
    body,
  })
}
