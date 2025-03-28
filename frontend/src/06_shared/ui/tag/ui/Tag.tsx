import { Tag as AntdTag } from "antd"
import { FC, PropsWithChildren } from "react"
import classNames from "classnames"

import { getRandomColor } from "../lib"

import styles from "./tag.module.scss"

type TProps = PropsWithChildren & {
  componentClassName?: string
  children: string
}

export const Tag: FC<TProps> = ({ componentClassName, children }) => {
  const tagColor = getRandomColor() ?? "default"

  const componentClass = classNames(styles.component, componentClassName)

  return (
    <AntdTag
      className={componentClass}
      color={tagColor}
    >
      {children}
    </AntdTag>
  )
}
