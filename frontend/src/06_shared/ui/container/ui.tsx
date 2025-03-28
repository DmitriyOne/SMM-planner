import { FC, PropsWithChildren } from "react"
import styles from "./styles.module.scss"
import classNames from "classnames"

type TProps = PropsWithChildren & {
  className?: string
  size?: "sm" | "md" | "lg" | "full"
}

export const Container: FC<TProps> = ({ className, size = "lg", children }) => {
  const componentClassName = classNames(styles.component, className, {
    [styles[size]]: size,
  })

  return <div className={componentClassName}>{children}</div>
}
