import { TUser } from "@/05_entities/user/model"
import styles from "./post-author.module.scss"
import { FC } from "react"
import { formatIsoToDatetime } from "@/06_shared/model/utils"
import classNames from "classnames"

type TProps = {
  componentClassName?: string
  nameClassName?: string
  dateClassName?: string
} & Pick<TUser, "name" | "createdAt">

export const PostAuthor: FC<TProps> = ({
  name,
  createdAt,
  componentClassName,
  nameClassName,
  dateClassName,
}) => {
  const dateString = formatIsoToDatetime(createdAt)

  const componentClass = classNames(styles.component, componentClassName)
  const nameClass = classNames(styles.username, nameClassName)
  const dateClass = classNames(styles.date, dateClassName)

  return (
    <div className={componentClass}>
      by <span className={nameClass}>{name}</span> at{" "}
      <span className={dateClass}>{dateString}</span>
    </div>
  )
}
