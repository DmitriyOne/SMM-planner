import { Tooltip } from "antd"
import { EditOutlined } from "@ant-design/icons"

import styles from "./styles.module.scss"
import classNames from "classnames"
import { FC } from "react"

type TProps = {
  buttonClassName?: string
  handleEditable?: () => void
}

export const EditableTooltip: FC<TProps> = ({
  buttonClassName,
  handleEditable,
}) => {
  const buttonClass = classNames(styles.button, buttonClassName)

  return (
    <Tooltip
      placement='top'
      title='click to edit text'
    >
      <button
        className={buttonClass}
        onClick={handleEditable}
      >
        <EditOutlined className={styles.icon} />
      </button>
    </Tooltip>
  )
}
