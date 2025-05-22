import Title from "antd/es/typography/Title"
import styles from "./settings.module.scss"
import { Divider, Space } from "antd"
import { UpdateUserName } from "@/04_features/update-user-name/ui"
import { ChangeUserPassword } from "@/04_features/change-user-password/ui"

export const SettingsPage = () => {
  return (
    <div className={styles.component}>
      <Title>Settings</Title>
      <Divider />
      <Space
        direction='vertical'
        size='middle'
        className={styles.container}
      >
        <UpdateUserName />
        <ChangeUserPassword />
        {/* TODO: delete account */}
      </Space>
    </div>
  )
}
