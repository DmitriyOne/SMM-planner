"use client"

import { createContext, useContext } from "react"
import { TUser } from "../types"

export type TUserContext = {
  user: TUser | null
  token: string | null
  setUser: (user: TUser | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

const initialState: TUserContext = {
  user: null,
  token: null,
  setUser: () => null,
  setToken: () => null,
  logout: () => null,
}

export const UserContext = createContext<TUserContext>(initialState)

export const useUserContext = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("useUserContext must be used inside UserProvider")
  return ctx
}
