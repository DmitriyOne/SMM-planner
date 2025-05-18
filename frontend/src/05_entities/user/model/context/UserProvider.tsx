"use client"

import { useRouter } from "next/navigation"
import { TUser } from "../types"
import { UserContext } from "./UserContext"
import { PropsWithChildren, useState } from "react"
import { paths } from "@/06_shared/config/routing"
import { logout } from "@/06_shared/api/auth"
import { useLoading } from "@/06_shared/model/hooks"

type Props = PropsWithChildren & {}

export const UserProvider = ({ children }: Props) => {
  const router = useRouter()
  const [user, setUser] = useState<TUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const { isLoading, startLoading, stopLoading } = useLoading()

  const handlerLogout = async () => {
    setUser(null)
    setToken(null)
    await logout()
    router.push(paths.login)
  }

  const value = {
    user,
    setUser,
    token,
    setToken,
    logout: handlerLogout,
    isLoading,
    startLoading,
    stopLoading,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
