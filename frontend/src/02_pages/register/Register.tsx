import { RegisterForm, SocialLogin } from "@/04_features/auth/ui"
import Title from "antd/es/typography/Title"

import { FullHeight } from "@/06_shared/ui"

import styles from "./register.module.scss"

export const RegisterPage = () => {
  return (
    <FullHeight
      className={styles.component}
      content='center'
    >
      <Title>Register</Title>
      <RegisterForm />
      <div className={styles.socialLoginContainer}>
        <SocialLogin />
      </div>
    </FullHeight>
  )
}
