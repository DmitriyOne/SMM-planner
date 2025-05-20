import { FC, PropsWithChildren } from "react"

import { Sidebar } from "@/03_widgets/sidebar/ui"
import { FullHeight } from "@/06_shared/ui"

import styles from "./dashboard-layout.module.scss"

export const DashboardMainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FullHeight className={styles.container}>
      <Sidebar />
      <div className={styles.info}>{children}</div>
    </FullHeight>
  )
}
