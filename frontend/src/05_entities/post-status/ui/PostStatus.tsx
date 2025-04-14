import { FC } from "react"
import Text from "antd/es/typography/Text"

import styles from "./post-status.module.scss"
import classNames from "classnames"

type TProps = {
  status: boolean
  question: string
  className?: string
  statusClassName?: string
}

export const PostStatus: FC<TProps> = ({
  question,
  status,
  className,
  statusClassName,
}) => {
  const statusText = status ? "Yes!" : "No."

  const componentClassName = classNames(styles.component, className)

  return (
    <Text
      className={componentClassName}
      type='secondary'
    >
      {question}{" "}
      <Text
        className={statusClassName}
        type='secondary'
        italic
      >
        {statusText}
      </Text>
    </Text>
  )
}
