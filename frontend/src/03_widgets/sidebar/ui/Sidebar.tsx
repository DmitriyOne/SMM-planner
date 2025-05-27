"use client"

import Sider from "antd/es/layout/Sider"

import { Menu } from "@/05_entities/navigation/ui"
import { getSidebarMenu } from "@/06_shared/config/menu"
import { useUserContext } from "@/05_entities/user/model/context"

import styles from "./sidebar.module.scss"

export const Sidebar = () => {
  const { user } = useUserContext()

  return (
    <Sider
      width={200}
      className={styles.component}
    >
      <Menu
        className={styles.menu}
        itemClassName={styles.item}
        items={getSidebarMenu(user?.role)}
      />
    </Sider>
  )
}
