import { isFormData, prepareRequestBody } from "../model/utils"
import { getBaseUrl } from "./base-url"
import { HeadersValue, Headers } from "./headers"
import { HttpMethod } from "./http"
import { TFetcherOptions } from "./types"

export async function fetcher<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  { body, token, ...options }: TFetcherOptions = {},
  isPublic = false,
): Promise<T> {
  const url = isPublic ? endpoint : `${getBaseUrl()}${endpoint}`
  const isForm = isFormData(body)
  const bodyRequest = prepareRequestBody(body)

  try {
    const headers: HeadersInit = {
      ...(!isForm && {
        [Headers.CONTENT_TYPE]: HeadersValue.CONTENT_TYPE_JSON,
      }),
      ...(token && {
        [Headers.AUTHORIZATION]: `${HeadersValue.AUTHORIZATION_BEARER} ${token}`,
      }),
    }

    const response = await fetch(url, {
      method,
      headers,
      body: bodyRequest,
      ...options,
    })

    if (!response.ok) {
      const contentType = response.headers.get("Content-Type") || ""
      let errorMessage = `Ошибка ${response.status}: ${response.statusText}`

      if (contentType.includes("application/json")) {
        const data = await response.json()
        errorMessage = data.error || errorMessage
      } else {
        const text = await response.text()
        errorMessage = text || errorMessage
      }

      throw new Error(errorMessage)
    }

    return (await response.json()) as T
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error :", error)
    throw error
  }
}
