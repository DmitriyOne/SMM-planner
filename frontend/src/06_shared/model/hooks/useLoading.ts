import { useState } from "react"

export const useLoading = (defaultValue = false) => {
  const [isLoading, setIsLoading] = useState(defaultValue)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return {
    isLoading,
    startLoading,
    stopLoading,
  }
}
