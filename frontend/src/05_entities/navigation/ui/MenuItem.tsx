"use client"

import { FC } from "react"
import { Avatar } from "antd"

import { THeaderItem } from "../model/types"
import { ActiveLink } from "@/06_shared/ui/active-link"

import styles from "./menu-item.module.scss"

type TProps = THeaderItem & {
  username: string
}

export const MenuItem: FC<TProps> = ({ username, ...item }) => {
  if (!item.condition) {
    return <></>
  }

  const avatarBgColor = "#2f54eb"

  const handleClick = () => {
    if (item.href.includes("logout")) {
      // logout user
    }
  }

  return (
    <li
      key={item.href}
      className={styles.component}
    >
      <ActiveLink
        href={item.href}
        onClick={handleClick}
        className={styles.item}
      >
        {item.title}
        {item.href.includes("profile") && (
          <Avatar
            className={styles.avatar}
            style={{ backgroundColor: avatarBgColor }}
            shape='square'
          >
            {username[0].toUpperCase()}
          </Avatar>
        )}
      </ActiveLink>
    </li>
  )
}
