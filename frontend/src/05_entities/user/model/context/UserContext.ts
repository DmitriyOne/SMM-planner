"use client"

import { createContext, useContext } from "react"
import { TUser } from "../types"

export type TUserContext = {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
  user: TUser | null
  token: string | null
  setUser: (user: TUser | null) => void
  setToken: (token: string | null) => void
}

const initialState: TUserContext = {
  isLoading: true,
  startLoading: () => null,
  stopLoading: () => null,
  user: null,
  token: null,
  setUser: () => null,
  setToken: () => null,
}

export const UserContext = createContext<TUserContext>(initialState)

export const useUserContext = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("useUserContext must be used inside UserProvider")
  return ctx
}
