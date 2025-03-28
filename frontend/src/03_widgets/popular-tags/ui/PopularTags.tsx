import { FC, Suspense } from "react"
import Title from "antd/es/typography/Title"
import classNames from "classnames"

import { getTags } from "@/05_entities/tags/api"

import styles from "./popular-tags.module.scss"
import { SkeletonTags, Tags } from "@/05_entities/tags/ui"

type TProps = {
  title?: string
  componentClassName?: string
}

export const PopularTags: FC<TProps> = ({
  title = "Popular Tags",
  componentClassName,
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
        <Tags getTags={getTags()} />
      </Suspense>
    </div>
  )
}
