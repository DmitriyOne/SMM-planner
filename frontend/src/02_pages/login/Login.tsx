import { LoginForm } from "@/04_features/auth/ui"
import Title from "antd/es/typography/Title"

import { FullHeight } from "@/06_shared/ui"

import styles from "./login.module.scss"

export const LoginPage = () => {
  return (
    <FullHeight
      className={styles.component}
      content='center'
    >
      <Title>Login</Title>
      <LoginForm />
    </FullHeight>
  )
}
