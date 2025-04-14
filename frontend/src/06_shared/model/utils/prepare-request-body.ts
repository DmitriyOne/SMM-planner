import { isFormData } from "./is-form-data"

export function prepareRequestBody(body: unknown): BodyInit | null {
  if (!body) return null
  return isFormData(body) ? body : JSON.stringify(body)
}
