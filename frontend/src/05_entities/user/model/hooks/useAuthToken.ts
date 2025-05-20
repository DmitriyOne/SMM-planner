import { useEffect } from "react"
import { useUserContext } from "../context"
import { getToken } from "@/06_shared/api/auth"
import { message } from "antd"
import { MESSAGE } from "../../config"
import { useRouter } from "next/navigation"

export const useAuthToken = () => {
  const router = useRouter()
  const { token, setToken } = useUserContext()

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await getToken()
        setToken(storedToken)
      } catch {
        setToken(null)
        message.error(MESSAGE.SOMETHING_WENT_WRONG)
      }
    }

    if (token) return

    loadToken()
  }, [router, setToken, token])
}
