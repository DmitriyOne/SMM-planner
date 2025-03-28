"use client"

import { FC, useState } from "react"
import classNames from "classnames"

import Paragraph from "antd/es/typography/Paragraph"

import styles from "./style.module.scss"

type TProps = {
  text: string
  componentClassName?: string
  rows?: number
}

export const CollapsibleText: FC<TProps> = ({
  componentClassName,
  rows = 3,
  text,
}) => {
  const [expanded, setExpanded] = useState(false)

  const onExpand = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    info: {
      expanded: boolean
    },
  ) => {
    event.preventDefault()
    setExpanded(info.expanded)
  }

  const buttonText = expanded ? "Read less" : "Read more"

  const componentClass = classNames(styles.component, componentClassName)

  return (
    <Paragraph
      className={componentClass}
      ellipsis={{
        rows,
        expandable: "collapsible",
        expanded,
        onExpand,
        symbol: buttonText,
      }}
    >
      {text}
    </Paragraph>
  )
}
