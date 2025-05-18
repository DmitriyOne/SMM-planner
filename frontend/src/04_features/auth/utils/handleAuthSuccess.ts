import { getUser } from "@/05_entities/user/api"
import { TUser } from "@/05_entities/user/model/types"
import { paths } from "@/06_shared/config/routing"
import { delay } from "@/06_shared/model/utils"
import { message } from "antd"
import { AUTH_MESSAGE } from "../config"

type Params = {
  accessToken: string
  onTokenSet: (token: string) => void
  onUserLoad: (user: TUser) => void
  redirect: (path: string) => void
  startLoading: () => void
  stopLoading: () => void
}

export const handleAuthSuccess = async ({
  accessToken,
  onUserLoad,
  onTokenSet,
  redirect,
  startLoading,
  stopLoading,
}: Params) => {
  startLoading()
  onTokenSet(accessToken)
  try {
    const user = await getUser(accessToken)
    onUserLoad(user)
    message.success(AUTH_MESSAGE.success, 2)
    await delay(500)
    message.info(AUTH_MESSAGE.redirectToProfile, 3)
    await delay(3000)
    redirect(paths.profile)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : AUTH_MESSAGE.error
    message.error(errorMessage)
  } finally {
    stopLoading()
  }
}
