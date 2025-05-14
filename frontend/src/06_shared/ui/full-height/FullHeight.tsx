import { FC, PropsWithChildren } from "react"

import styles from "./full-height.module.scss"
import classNames from "classnames"

type TProps = PropsWithChildren & {
  className?: string
  content?: "center" | null
}

export const FullHeight: FC<TProps> = ({ className, children, content }) => {
  const componentClassName = classNames(styles.component, className, {
    [styles.center]: content === "center",
  })
  return <div className={componentClassName}>{children}</div>
}
