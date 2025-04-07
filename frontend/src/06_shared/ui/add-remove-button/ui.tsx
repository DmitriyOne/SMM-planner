import { FC } from "react"
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons"
import classNames from "classnames"

import styles from "./styles.module.scss"
import { EIconType } from "@/06_shared/config/enums"
import { TTag } from "../tag/model/types"

type TProps = {
  type: EIconType
  className?: string
  iconClassName?: string
  onClick?: () => void
  marginPosition?: "left" | "right" | null
}

export const AddRemoveButton: FC<TProps> = ({
  type,
  className,
  iconClassName,
  marginPosition = "left",
  onClick,
}) => {
  const componentClass = classNames(styles.component, className, {
    [styles.left]: marginPosition === "left",
    [styles.right]: marginPosition === "right",
  })
  const iconClass = classNames(styles.icon, iconClassName)

  const icon =
    type === "add" ? (
      <PlusCircleFilled
        className={iconClass}
        style={{ color: "green" }}
      />
    ) : (
      <MinusCircleFilled
        className={iconClass}
        style={{ color: "red" }}
      />
    )

  return (
    <button
      className={componentClass}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
