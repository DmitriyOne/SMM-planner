import { getUser } from "@/05_entities/user/api"
import { TUser } from "@/05_entities/user/model/types"
import { paths } from "@/06_shared/config/routing"
import { delay } from "@/06_shared/model/utils"
import { message } from "antd"
import { AUTH_MESSAGE } from "../config"

type Params = {
  accessToken: string
  userId: string
  onTokenSet: (token: string) => void
  onUserLoad: (user: TUser) => void
  redirect: (path: string) => void
}

export const handleAuthSuccess = async ({
  accessToken,
  userId,
  onUserLoad,
  onTokenSet,
  redirect,
}: Params) => {
  onTokenSet(accessToken)
  const user = await getUser(userId, accessToken)
  onUserLoad(user)
  message.success(AUTH_MESSAGE.success, 2)
  await delay(500)
  message.info(AUTH_MESSAGE.redirectToProfile, 3)
  await delay(3000)
  redirect(paths.profile)
}
