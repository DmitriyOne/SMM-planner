"use client"

import { FC, PropsWithChildren } from "react"

import { Sidebar } from "@/03_widgets/sidebar/ui"
import { FullHeight } from "@/06_shared/ui"

import styles from "./dashboard-layout.module.scss"
import { useAuthToken, useAuthUser } from "@/05_entities/user/model/hooks"

export const DashboardMainLayout: FC<PropsWithChildren> = ({ children }) => {
  useAuthToken()
  useAuthUser()

  return (
    <FullHeight className={styles.container}>
      <Sidebar />
      <div className={styles.info}>{children}</div>
    </FullHeight>
  )
}
