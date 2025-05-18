import { useActionState, useContext, useEffect, useRef } from "react"
import { loginAction } from "../actions"
import { message } from "antd"
import { useRouter } from "next/navigation"
import { UserContext } from "@/05_entities/user/model/context"
import { handleAuthSuccess } from "../../utils"

export const useLogin = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const { setToken, setUser, startLoading, stopLoading } =
    useContext(UserContext)

  useEffect(() => {
    if (state?.success) {
      handleAuthSuccess({
        accessToken: state.accessToken as string,
        onTokenSet: setToken,
        onUserLoad: setUser,
        redirect: router.push,
        startLoading,
        stopLoading,
      })
    } else if (state?.errors?.api) {
      message.error(state.errors?.api)
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
