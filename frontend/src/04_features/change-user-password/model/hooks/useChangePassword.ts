import { useActionState, useEffect, useRef } from "react"
import { changePasswordAction } from "../actions"
import { message } from "antd"
import { MESSAGE } from "../../config"

export const useChangePassword = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(
    changePasswordAction,
    null,
  )

  useEffect(() => {
    if (state?.success) {
      message.success(
        state.successMessage || MESSAGE.PASSWORD_CHANGED_SUCCESS,
        5,
      )
      if (formRef.current) {
        formRef.current.reset()
        const inputs = formRef.current?.querySelectorAll("input")
        inputs?.forEach((input) => (input.value = ""))
      }
    } else if (state?.errors?.api) {
      message.error(state.errors?.api)
    }
  }, [state])

  return {
    formRef,
    state,
    formAction,
    isPending,
  }
}
