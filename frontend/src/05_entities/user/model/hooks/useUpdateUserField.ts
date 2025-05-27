import { message as antMessage } from "antd"

import { useLoading } from "@/06_shared/model/hooks"
import { useUserContext } from "../context"
import { TEditableUserField } from "../types"
import { useEffect, useState } from "react"
import { updateUser } from "../../api"
import { MESSAGE } from "../../config"

export const useUpdateUserField = (field: TEditableUserField) => {
  const {
    token,
    user,
    isLoading: isUserContextLoading,
    setUser,
  } = useUserContext()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [newValue, setNewValue] = useState("")
  const [isUpdateApi, setIsUpdateApi] = useState(false)

  useEffect(() => {
    if (!newValue && user) {
      setNewValue(user[field] ?? "")
    }
    if (isUpdateApi) {
      handleApiCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateApi, user])

  const handleApiCall = async () => {
    startLoading()
    try {
      await updateUser(token as string, user?.id as string, {
        [field]: newValue,
      })
      setUser((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          [field]: newValue,
        }
      })
      antMessage.success(MESSAGE.UPDATE_SUCCESS(field))
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : MESSAGE.SOMETHING_WENT_WRONG
      antMessage.error(errorMessage)
      setNewValue(user?.[field] ?? "")
    } finally {
      stopLoading()
      setIsUpdateApi(false)
    }
  }

  const handleSuccess = async () => {
    setIsUpdateApi(true)
  }

  return {
    setNewValue,
    isLoading,
    isUserContextLoading,
    newValue,
    handleSuccess,
  }
}
