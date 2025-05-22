import { LogoutForm } from "@/04_features/auth/ui"
import { Divider } from "antd"
import Title from "antd/es/typography/Title"

import styles from "./logout-page.module.scss"

export const LogoutPage = () => {
  return (
    <div className={styles.component}>
      <Title>Logout</Title>
      <Divider />
      <LogoutForm />
    </div>
  )
}
