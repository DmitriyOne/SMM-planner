import { FC, PropsWithChildren, use } from "react"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { TagsList } from "../tags-list"
import Link from "next/link"

import { paths } from "@/06_shared/config/routing"

import styles from "./tags-async.module.scss"

type TProps = {
  getTags: Promise<TTag[]>
  className?: string
  tagClassName?: string
  isAllTagsLink?: boolean
  isLink?: boolean
} & PropsWithChildren

export const TagsAsync: FC<TProps> = ({
  getTags,
  className,
  tagClassName,
  isAllTagsLink,
  isLink,
  children,
}) => {
  const allTags = use(getTags)

  const visibleTags = isAllTagsLink ? allTags.slice(0, 5) : allTags

  return (
    <TagsList
      tags={visibleTags}
      className={className}
      tagComponentClassName={tagClassName}
      isLink={isLink}
    >
      {children}

      {isAllTagsLink && (
        <Link
          href={paths.tags}
          className={styles.link}
        >
          View all
        </Link>
      )}
    </TagsList>
  )
}
