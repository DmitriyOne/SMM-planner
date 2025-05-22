import { LogoutForm } from "@/04_features/auth/ui"

import styles from "./logout-page.module.scss"

export const LogoutPage = () => {
  return (
    <div className={styles.component}>
      <LogoutForm />
    </div>
  )
}
