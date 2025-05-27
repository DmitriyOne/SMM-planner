import { getToken } from "@/06_shared/api/auth"
import { useLoading } from "@/06_shared/model/hooks"
import { message as antMessage } from "antd"
import { useEffect, useState } from "react"
import { MESSAGE } from "../../config"
import { updateTag } from "@/05_entities/tags/api"

export const useUpdateTagTitle = (id: string, defaultValue: string) => {
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [newValue, setNewValue] = useState(defaultValue)
  const [isUpdateApi, setIsUpdateApi] = useState(false)

  useEffect(() => {
    if (isUpdateApi) {
      handleApiCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateApi])

  const handleApiCall = async () => {
    startLoading()
    try {
      const token = await getToken()
      await updateTag(token, id, newValue)

      antMessage.success(MESSAGE.UPDATE_SUCCESS)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : MESSAGE.SOMETHING_WENT_WRONG
      antMessage.error(errorMessage)
      setNewValue(defaultValue)
    } finally {
      stopLoading()
      setIsUpdateApi(false)
    }
  }

  const handleSuccess = () => {
    setIsUpdateApi(true)
  }

  return {
    setNewValue,
    isLoading,
    newValue,
    handleSuccess,
  }
}
