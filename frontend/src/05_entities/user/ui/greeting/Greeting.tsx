import Title from "antd/es/typography/Title"

import styles from "./greeting.module.scss"

export const Greeting = () => {
  return <Title className={styles.title}>Welcome to your profile!</Title>
}
