import { Card } from "antd"
import { SkeletonTags, TagsStatic } from "@/05_entities/tags/ui"
import { FC, Suspense } from "react"
import { PostAuthor } from "@/05_entities/post-author/ui"
import { CollapsibleText } from "@/06_shared/ui/collapsible-text"

import { ReadMore } from "@/06_shared/ui/read-more"

import { CARD_STYLES } from "../config"

import styles from "./post-card.module.scss"
import { paths } from "@/06_shared/config/routing"
import { TPost } from "@/05_entities/post/model"

type TProps = {
  post: TPost
}

export const PostCard: FC<TProps> = ({ post }) => {
  if (!post) {
    return <></>
  }

  const postHref = paths.post_read(post.id.toString())

  return (
    <Card
      className={styles.component}
      title={post.title}
      extra={<ReadMore href={postHref} />}
      styles={CARD_STYLES}
    >
      <Suspense
        fallback={
          <SkeletonTags
            componentClassName={styles.tags}
            amount={2}
          />
        }
      >
        <TagsStatic
          componentClassName={styles.tags}
          tags={post.tags}
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
