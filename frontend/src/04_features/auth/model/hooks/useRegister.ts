import { useActionState, useEffect, useRef } from "react"
import { registerAction } from "../actions"
import { message } from "antd"
import { AUTH_MESSAGE } from "../../config"
import { useRouter } from "next/navigation"
import { delay } from "@/06_shared/model/utils"
import { paths } from "@/06_shared/config/routing"

export const useRegister = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(registerAction, null)

  useEffect(() => {
    if (state?.success) {
      message.success(AUTH_MESSAGE.success.register, 2)
      delay(500).then(() => {
        message.info(AUTH_MESSAGE.success.redirectToProfile, 3)
      })
      delay(3000).then(() => {
        router.push(paths.profile)
      })
    } else if (
      state?.success === false &&
      !isPending &&
      state?.errors?.apiError
    ) {
      message.error(state.errors?.apiError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, isPending])

  return {
    formRef,
    state,
    formAction,
    isPending,
  }
}
