import { URLPattern } from "next/server"

export const matchesRoutePattern = (pattern: string, url: string): boolean => {
  return new URLPattern({ pathname: pattern }).test(url)
}
