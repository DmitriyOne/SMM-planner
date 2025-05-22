import { paths } from "@/06_shared/config/routing"
import { delay } from "@/06_shared/model/utils"
import { message } from "antd"
import { AUTH_MESSAGE } from "../config"

type Params = {
  form: HTMLFormElement | null
  redirect: (path: string) => void
}

export const handleAuthSuccess = async ({ redirect, form }: Params) => {
  message.success(AUTH_MESSAGE.success, 2)
  await delay(500)
  message.success(AUTH_MESSAGE.redirectToProfile, 3)
  form?.reset()
  const inputs = form?.querySelectorAll("input")
  inputs?.forEach((input) => (input.value = ""))
  await delay(3000)
  redirect(paths.profile)
}
