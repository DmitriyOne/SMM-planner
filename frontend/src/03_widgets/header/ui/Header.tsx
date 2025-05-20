import { FC } from "react"
import { Menu } from "@/05_entities/navigation/ui"
import { Logo } from "@/06_shared/ui"

import { Container } from "@/06_shared/ui/container"
import {
  getHeaderMenuForUser,
  HEADER_MENU_GUEST,
} from "@/06_shared/config/menu"
import { THeaderProps } from "../model/types"

import styles from "./header.module.scss"

export const Header: FC<THeaderProps> = ({ authorized, username, role }) => {
  const items = authorized
    ? getHeaderMenuForUser(username, role)
    : HEADER_MENU_GUEST

  return (
    <header className={styles.component}>
      <Container className={styles.wrapper}>
        <Logo />
        <Menu
          itemClassName={styles.item}
          items={items}
        />
      </Container>
    </header>
  )
}
