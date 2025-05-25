import { useUserContext } from "@/05_entities/user/model/context"
import { useActionState, useEffect, useRef } from "react"
import { updateRoleAction } from "../actions"
import { message } from "antd"
import { IDS, MESSAGE } from "../../config"

export const useUpdateRoleForm = () => {
  const { isLoading } = useUserContext()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(updateRoleAction, null)

  useEffect(() => {
    if (state?.success) {
      message.success(state.successMessage || MESSAGE.SUCCESS, 5)
      if (formRef.current) {
        formRef.current.reset()
        const input = document.getElementById(IDS.user_id) as HTMLInputElement
        input.value = ""
      }
    } else if (state?.errors?.api) {
      message.error(state.errors?.api)
    }
  }, [state])

  return {
    isLoading,
    formRef,
    state,
    isPending,
    formAction,
  }
}
