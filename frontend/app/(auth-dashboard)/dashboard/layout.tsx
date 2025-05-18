"use client"

import { useAuthToken, useAuthUser } from "@/05_entities/user/model/hooks"
import { JSX, ReactNode } from "react"

export type TProps = Readonly<{
  children: ReactNode
}>

export default function DashboardLayout({ children }: TProps): JSX.Element {
  useAuthToken()
  useAuthUser()

  return <>{children}</>
}
