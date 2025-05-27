import { Divider } from "antd"
import Title from "antd/es/typography/Title"
import { UpdateRoleForm } from "@/04_features/update-role-form/ui"

import styles from "./update-role-page.module.scss"

export const UpdateRolePage = () => {
  return (
    <div className={styles.component}>
      <Title>Update role</Title>
      <Divider />
      <UpdateRoleForm />
    </div>
  )
}
