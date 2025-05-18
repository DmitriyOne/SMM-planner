import { useEffect } from "react"
import { useUserContext } from "../context"
import { getToken } from "@/06_shared/api/auth"
import { message } from "antd"
import { MESSAGE } from "../../config"
import { useRouter } from "next/navigation"
import { paths } from "@/06_shared/config/routing"

export const useAuthToken = () => {
  const router = useRouter()
  const { token, setToken } = useUserContext()

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await getToken()
        if (!storedToken) {
          message.error(MESSAGE.TOKEN_NOT_FOUND)
          router.push(paths.login)
          return
        }
        setToken(storedToken)
      } catch {
        setToken(null)
        message.error(MESSAGE.SOMETHING_WENT_WRONG)
        router.push(paths.login)
      }
    }

    if (token) return

    loadToken()
  }, [router, setToken, token])
}
