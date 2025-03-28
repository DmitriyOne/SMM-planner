import { FC, use } from "react"
import classNames from "classnames"
import { isValidArray } from "@/06_shared/model/utils"
import { DataNoFound } from "@/06_shared/ui"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { Tag } from "@/06_shared/ui/tag/ui"

import styles from "./tags.module.scss"

type TProps = {
  getTags: Promise<TTag[]>
  componentClassName?: string
}

export const TagsAsync: FC<TProps> = ({ getTags, componentClassName }) => {
  const tags = use(getTags)

  if (!isValidArray(tags)) {
    return <DataNoFound title='Tags' />
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
