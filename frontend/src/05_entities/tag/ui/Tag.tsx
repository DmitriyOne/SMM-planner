import { Tag as AntdTag } from "antd"
import { FC, PropsWithChildren } from "react"

import { getRandomColor } from "../lib"

type TProps = PropsWithChildren & {
  className?: string
  children: string
}

export const Tag: FC<TProps> = ({ className, children }) => {
  const tagColor = getRandomColor() ?? "default"

  return (
    <AntdTag
      className={className}
      color={tagColor}
    >
      {children}
    </AntdTag>
  )
}
