export const createErrorMessage = async (
  response: Response,
): Promise<string> => {
  const contentType = response.headers.get("Content-Type") || ""

  if (contentType.includes("application/json")) {
    const data = await response.json()
    return (
      data.error ||
      `${data.status}: ${data.message}` ||
      response.statusText ||
      "Unknown error"
    )
  }

  const text = await response.text()
  return text || "Unknown error"
}
