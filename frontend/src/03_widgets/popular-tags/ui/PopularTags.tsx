import { FC, Suspense } from "react"
import Title from "antd/es/typography/Title"

import { SkeletonTags, Tags } from "@/03_widgets/tags/ui"
import { getTags } from "@/05_entities/tag/api"

import styles from "./popular-tags.module.scss"

type TProps = {
  title?: string
}

export const PopularTags: FC<TProps> = ({ title = "Popular Tags" }) => {
  return (
    <div className={styles.component}>
      <Title
        className={styles.title}
        level={5}
      >
        {title}
      </Title>

      <Suspense fallback={<SkeletonTags />}>
        <Tags getAllTags={getTags()} />
      </Suspense>
    </div>
  )
}
