import Title from "antd/es/typography/Title"
import { Divider, Space } from "antd"
import { UpdateUserName } from "@/04_features/update-user-name/ui"
import { ChangeUserPassword } from "@/04_features/change-user-password/ui"
import { DeleteUser } from "@/04_features/delete-user/ui"

import styles from "./settings.module.scss"

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
        <DeleteUser isPositionAbsolute />
      </Space>
    </div>
  )
}
