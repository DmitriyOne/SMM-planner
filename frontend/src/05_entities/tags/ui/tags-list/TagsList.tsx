import { DataNoFound, Tag } from "@/06_shared/ui"
import { isValidArray } from "@/06_shared/model/utils"

import { TTag } from "@/06_shared/ui/tag/model/types"
import { FC, PropsWithChildren } from "react"

import classNames from "classnames"

import { AddRemoveButton } from "@/06_shared/ui/add-remove-button/ui"
import { EIconType } from "@/06_shared/config/enums"
import Text from "antd/es/typography/Text"

import styles from "./tags-list.module.scss"
import Link from "next/link"
import { paths } from "@/06_shared/config/routing"

type TProps = {
  isLoading?: boolean
  tags: TTag[]
  className?: string
  tagComponentClassName?: string
  getIconType?: (tag: TTag) => EIconType
  onTagClick?: (tag: TTag) => void
  isLink?: boolean
} & PropsWithChildren

export const TagsList: FC<TProps> = ({
  tags,
  className,
  tagComponentClassName,
  isLoading,
  getIconType,
  onTagClick,
  isLink,
  children,
}) => {
  if (isLoading) {
    return <Text className={className}>Loading...</Text>
  }

  if (!isValidArray(tags)) {
    return (
      <DataNoFound
        className={className}
        title='Tags'
      />
    )
  }

  const componentClass = classNames(styles.component, className)

  return (
    <div className={componentClass}>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          id={tag.id}
          componentClassName={tagComponentClassName}
        >
          {isLink ? (
            <Link href={paths.tag_read(tag.id?.toString())}>{tag.title}</Link>
          ) : (
            tag.title
          )}

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
