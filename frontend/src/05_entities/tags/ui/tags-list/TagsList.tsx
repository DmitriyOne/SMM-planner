import { DataNoFound, Tag } from "@/06_shared/ui"
import { isValidArray } from "@/06_shared/model/utils"

import { TTag } from "@/06_shared/ui/tag/model/types"
import { FC, PropsWithChildren } from "react"

import classNames from "classnames"

import styles from "./tags-list.module.scss"

type TProps = {
  tags: TTag[]
  className?: string
  tagComponentClassName?: string
} & PropsWithChildren

export const TagsList: FC<TProps> = ({
  tags,
  className,
  tagComponentClassName,
  children,
}) => {
  if (!isValidArray(tags)) {
    return <DataNoFound title='Tags' />
  }

  const componentClass = classNames(styles.component, className)

  return (
    <div className={componentClass}>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          componentClassName={tagComponentClassName}
        >
          {tag.title}
        </Tag>
      ))}
      {children}
    </div>
  )
}
