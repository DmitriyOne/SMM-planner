import { isServer } from "../config"
import { ENodeEnv } from "../config/enums"

const API_BASE_NAME_CLIENT = "localhost"
const API_BASE_NAME_SERVER = "backend"

export const getBaseUrl = () => {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL as string
  const isDev = process.env.NODE_ENV === ENodeEnv.development

  if (isServer && isDev) {
    baseUrl = baseUrl.replace(API_BASE_NAME_CLIENT, API_BASE_NAME_SERVER)
  }

  return baseUrl
}
