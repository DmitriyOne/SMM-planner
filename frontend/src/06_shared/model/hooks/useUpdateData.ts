import { message as antMessage } from "antd"

import { useLoading } from "./useLoading"

import { TResponseMessage } from "@/06_shared/api/types"
import { SOMETHING_WENT_WRONG } from "@/06_shared/config"
import { delay } from "../utils"

type TApiFunction<T> = () => Promise<T>
type THandleApiCallOptions = {
  apiFunction: TApiFunction<TResponseMessage>
  onSuccessCallback?: () => void
  onErrorCallback?: () => void
  successMessage?: string
}

export const useUpdateData = () => {
  const { isLoading, startLoading, stopLoading } = useLoading()

  const handleApiCall = async ({
    apiFunction,
    onSuccessCallback,
    onErrorCallback,
    successMessage,
  }: THandleApiCallOptions) => {
    startLoading()
    try {
      await delay(50000)
      const { message } = await apiFunction()
      onSuccessCallback?.()
      antMessage.success(successMessage || message)
    } catch (error) {
      onErrorCallback?.()
      const errorMessage =
        error instanceof Error ? error.message : SOMETHING_WENT_WRONG
      antMessage.error(errorMessage)
    } finally {
      stopLoading()
    }
  }

  return { isLoading, handleApiCall }
}
