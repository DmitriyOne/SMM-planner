import { useActionState, useEffect, useRef } from "react"
import { loginAction } from "../actions"
import { message } from "antd"
import { useRouter } from "next/navigation"
import { handleAuthSuccess } from "../../utils"

export const useLogin = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(loginAction, null)

  useEffect(() => {
    if (state?.success) {
      handleAuthSuccess({
        redirect: router.push,
        form: formRef.current,
      })
    } else if (state?.errors?.api) {
      message.error(state.errors?.api)
    }
  }, [state, router])

  return {
    formRef,
    state,
    formAction,
    isPending,
  }
}
