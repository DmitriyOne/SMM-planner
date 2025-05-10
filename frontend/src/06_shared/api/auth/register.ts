import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TAuthResponse, TRegisterBody } from "../types"

export const register = async (body: TRegisterBody): Promise<TAuthResponse> => {
  return fetcher<TAuthResponse>(ENDPOINTS.REGISTER, "POST", {
    cache: "force-cache",
    body,
  })
}
