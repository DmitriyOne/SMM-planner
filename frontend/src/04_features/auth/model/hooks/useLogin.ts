import { useActionState, useEffect, useRef } from "react"
import { loginAction } from "../actions"
import { message } from "antd"
import { AUTH_MESSAGE } from "../../config"

export const useLogin = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(loginAction, null)

  useEffect(() => {
    if (state?.success) {
      message.success(AUTH_MESSAGE.success.login)
    } else if (
      state?.success === false &&
      !isPending &&
      state?.errors?.apiError
    ) {
      message.error(state.errors?.apiError)
    }
  }, [state, isPending])

  return {
    formRef,
    state,
    formAction,
    isPending,
  }
}
