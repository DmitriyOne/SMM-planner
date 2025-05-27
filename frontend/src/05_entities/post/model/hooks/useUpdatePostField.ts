import { useEffect, useState } from "react"
import { message as antMessage } from "antd"

import { useLoading } from "@/06_shared/model/hooks"
import { updatePost } from "../../api"
import { MESSAGE } from "../../config"
import { TEditablePostField } from "../types"
import { getToken } from "@/06_shared/api/auth"

export const useUpdatePostField = (
  id: number,
  defaultValue: string | boolean,
  field: TEditablePostField,
) => {
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
      await updatePost(token, id, {
        [field]: newValue,
      })

      antMessage.success(MESSAGE.UPDATE_SUCCESS(field))
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
