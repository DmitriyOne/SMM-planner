import classNames from "classnames"
import Link from "next/link"
import { FC } from "react"

import styles from "./link-edit.module.scss"

type TProps = {
  redirectPath: string
  className?: string
}

export const LinkEdit: FC<TProps> = ({ redirectPath, className }) => {
  const componentClassName = classNames(styles.component, className)
  return (
    <Link
      className={componentClassName}
      href={redirectPath}
    >
      Edit
    </Link>
  )
}
