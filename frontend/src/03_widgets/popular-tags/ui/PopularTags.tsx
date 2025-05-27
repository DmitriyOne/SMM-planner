import { FC, Suspense } from "react"
import Title from "antd/es/typography/Title"
import classNames from "classnames"

import { SkeletonTags } from "@/05_entities/tags/ui/tags-skeleton"
import { TagsAsync } from "@/05_entities/tags/ui/tags-async"
import { getTags } from "@/05_entities/tags/api"

import styles from "./popular-tags.module.scss"

type TProps = {
  title?: string
  componentClassName?: string
  isAllTagsLink?: boolean
}

export const PopularTags: FC<TProps> = ({
  title = "Popular Tags",
  componentClassName,
  isAllTagsLink,
}) => {
  const componentClass = classNames(styles.component, componentClassName)

  return (
    <div className={componentClass}>
      <Title
        className={styles.title}
        level={5}
      >
        {title}
      </Title>

      <Suspense fallback={<SkeletonTags />}>
        <TagsAsync
          isLink
          getTags={getTags()}
          isAllTagsLink={isAllTagsLink}
        />
      </Suspense>
    </div>
  )
}
