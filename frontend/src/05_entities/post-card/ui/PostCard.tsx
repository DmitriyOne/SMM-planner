import { Card } from "antd"
import { SkeletonTags, Tags } from "@/05_entities/tags/ui"
import { getTags } from "@/05_entities/tags/api"
import { FC, Suspense } from "react"
import { PostAuthor } from "@/05_entities/post-author/ui"
import { CollapsibleText } from "@/06_shared/ui/collapsible-text"

import { ReadMore } from "@/06_shared/ui/read-more"

import { TPost } from "../model"
import { CARD_STYLES } from "../config"

import styles from "./post-card.module.scss"
import { paths } from "@/06_shared/config/routing"

type TProps = {
  post: TPost
}

export const PostCard: FC<TProps> = ({ post }) => {
  const postHref = paths.post_read(post.id.toString())

  return (
    <Card
      className={styles.component}
      title={post.title}
      extra={<ReadMore href={postHref} />}
      styles={CARD_STYLES}
    >
      {/* TODO: get tags for current post */}
      <Suspense
        fallback={
          <SkeletonTags
            componentClassName={styles.tags}
            amount={2}
          />
        }
      >
        <Tags
          componentClassName={styles.tags}
          getTags={getTags()}
        />
      </Suspense>

      <CollapsibleText text={post.description} />

      <PostAuthor
        name={post.author?.name}
        createdAt={post.author?.createdAt}
        componentClassName={styles.author}
      />
    </Card>
  )
}
