import { HeadersValue, Headers } from "@/06_shared/api"

export const prepareHeaders = (token?: string, isForm?: boolean) => {
  return {
    ...(!isForm && {
      [Headers.CONTENT_TYPE]: HeadersValue.CONTENT_TYPE_JSON,
    }),
    ...(token && {
      [Headers.AUTHORIZATION]: `${HeadersValue.AUTHORIZATION_BEARER} ${token}`,
    }),
  }
}
