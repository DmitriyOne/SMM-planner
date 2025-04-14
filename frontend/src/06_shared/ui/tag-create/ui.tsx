import classNames from "classnames"
import { FC } from "react"

import { AddRemoveButton } from "../add-remove-button/ui"

import styles from "./styles.module.scss"

type TProps = {
  className?: string
  iconButtonClassName?: string
  iconClassName?: string
  onClick?: () => void
}

export const TagCreate: FC<TProps> = ({
  className,
  iconButtonClassName,
  iconClassName,
  onClick,
}) => {
  const componentClass = classNames(styles.component, className)

  return (
    <div
      className={componentClass}
      onClick={onClick}
    >
      Create new tag
      <AddRemoveButton
        className={iconButtonClassName}
        iconClassName={iconClassName}
        type='add'
        onClick={onClick}
      />
    </div>
  )
}
