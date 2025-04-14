import { Menu } from "@/05_entities/navigation/ui"
import { Logo } from "@/06_shared/ui"

import styles from "./header.module.scss"
import { Container } from "@/06_shared/ui/container"

export const Header = () => {
  return (
    <header className={styles.component}>
      <Container className={styles.wrapper}>
        <Logo />
        <Menu />
      </Container>
    </header>
  )
}
