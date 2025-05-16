import { Button } from "antd"
import classNames from "classnames"
import { FC, ReactNode } from "react"

import styles from "./o-auth-button.module.scss"

type TProps = {
  className?: string
  label: string
  icon: ReactNode
  onClick?: () => void
  isDisabled?: boolean
}

export const OAuthButton: FC<TProps> = ({
  label,
  icon,
  onClick,
  className,
  isDisabled,
}) => {
  const componentClassName = classNames(styles.component, className)
  return (
    <Button
      className={componentClassName}
      icon={icon}
      onClick={onClick}
      type='default'
      disabled={isDisabled}
    >
      {label}
    </Button>
  )
}
