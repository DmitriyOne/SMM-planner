import { useEffect } from "react"
import { useUserContext } from "../context"
import { getUser } from "../../api"
import { message } from "antd"
import { MESSAGE } from "../../config"

export const useAuthUser = () => {
  const { user, token, setUser, startLoading, stopLoading } = useUserContext()

  useEffect(() => {
    if (!!user || !token) return

    const init = async () => {
      startLoading()
      try {
        const data = await getUser(token)
        setUser(data)
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : MESSAGE.SOMETHING_WENT_WRONG
        message.error(errorMessage)
        setUser(null)
      } finally {
        stopLoading()
      }
    }

    init()
  }, [token, user, setUser, startLoading, stopLoading])
}
