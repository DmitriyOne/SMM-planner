import { FC } from "react"
import Text from "antd/es/typography/Text"
import classNames from "classnames"

import styles from "./post-date.module.scss"
import { formatIsoToDatetime } from "@/06_shared/model/utils"

type TProps = {
  title?: string
  date: string
  className?: string
  dateClassName?: string
}

export const PostDate: FC<TProps> = ({
  title,
  date,
  className,
  dateClassName,
}) => {
  const formattedDate = formatIsoToDatetime(date)

  const componentClassName = classNames(styles.component, className)
  const dateClass = classNames(dateClassName)

  return (
    <Text
      type='secondary'
      className={componentClassName}
    >
      {title}{" "}
      <Text
        className={dateClass}
        type='secondary'
        italic
      >
        {formattedDate}
      </Text>
    </Text>
  )
}
