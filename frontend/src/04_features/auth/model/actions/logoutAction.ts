"use server"

import { paths } from "@/06_shared/config/routing"
import { deleteAccessTokenFromCookie } from "@/06_shared/lib/auth"
import { redirect } from "next/navigation"

export const logoutAction = async () => {
  await deleteAccessTokenFromCookie()
  redirect(paths.login)
}
