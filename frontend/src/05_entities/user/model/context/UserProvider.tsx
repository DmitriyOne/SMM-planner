"use client"

import { TUser } from "../types"
import { UserContext } from "./UserContext"
import { PropsWithChildren, useState } from "react"
import { useLoading } from "@/06_shared/model/hooks"

type Props = PropsWithChildren & {}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<TUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const { isLoading, startLoading, stopLoading } = useLoading(true)

  const value = {
    user,
    setUser,
    token,
    setToken,
    isLoading,
    startLoading,
    stopLoading,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
