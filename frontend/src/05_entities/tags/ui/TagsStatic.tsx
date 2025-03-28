import { FC } from "react"
import classNames from "classnames"
import { isValidArray } from "@/06_shared/model/utils"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { Tag } from "@/06_shared/ui/tag/ui"

import styles from "./tags.module.scss"

type TProps = {
  tags: TTag[]
  componentClassName?: string
}

export const TagsStatic: FC<TProps> = ({ tags, componentClassName }) => {
  if (!isValidArray(tags)) {
    return <></>
  }

  const componentClass = classNames(styles.component, componentClassName)

  return (
    <div className={componentClass}>
      {tags.map((tag) => (
        <Tag key={tag.id}>{tag.title}</Tag>
      ))}
    </div>
  )
}
