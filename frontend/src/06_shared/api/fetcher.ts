import { createErrorMessage } from "../lib/errors"
import { isFormData, prepareHeaders, prepareRequestBody } from "../model/utils"
import { getBaseUrl } from "./base-url"
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
    const headers = prepareHeaders(token, isForm)

    const response = await fetch(url, {
      method,
      headers,
      body: bodyRequest,
      ...options,
    })

    if (!response.ok) {
      const errorMessage = await createErrorMessage(response)
      throw new Error(errorMessage)
    }

    return (await response.json()) as T
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error :", error)
    throw error
  }
}
