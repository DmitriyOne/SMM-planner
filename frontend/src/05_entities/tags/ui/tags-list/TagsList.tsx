import { DataNoFound, Tag } from "@/06_shared/ui"
import { isValidArray } from "@/06_shared/model/utils"

import { TTag } from "@/06_shared/ui/tag/model/types"
import { FC, PropsWithChildren } from "react"

import classNames from "classnames"

import styles from "./tags-list.module.scss"
import { AddRemoveButton } from "@/06_shared/ui/add-remove-button/ui"
import { EIconType } from "@/06_shared/config/enums"

type TProps = {
  tags: TTag[]
  className?: string
  tagComponentClassName?: string
  getIconType?: (tag: TTag) => EIconType
  onTagClick?: (tag: TTag) => void
} & PropsWithChildren

export const TagsList: FC<TProps> = ({
  tags,
  className,
  tagComponentClassName,
  children,
  getIconType,
  onTagClick,
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
          {getIconType && (
            <AddRemoveButton
              type={getIconType(tag)}
              onClick={() => onTagClick?.(tag)}
            />
          )}
        </Tag>
      ))}
      {children}
    </div>
  )
}
