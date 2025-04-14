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
      const data = await response.json()
      throw new Error(
        data.error || `Ошибка ${response.status}: ${response.statusText}`,
      )
    }

    return (await response.json()) as T
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error :", error)
    throw error
  }
}
