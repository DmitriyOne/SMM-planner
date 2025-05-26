import { Card } from "antd"
import { FC } from "react"
import { PostAuthor } from "@/05_entities/post-author/ui"
import { CollapsibleText } from "@/06_shared/ui/collapsible-text"

import { ReadMore } from "@/06_shared/ui/read-more"

import { CARD_STYLES } from "../config"

import { paths } from "@/06_shared/config/routing"
import { TPost } from "@/05_entities/post/model/types"
import { PostDate } from "@/05_entities/post-date/ui"
import { TagsStatic } from "@/05_entities/tags/ui/tags-static"

import styles from "./post-card.module.scss"
import classNames from "classnames"

type TProps = {
  className?: string
  post: TPost
}

export const PostCard: FC<TProps> = ({ className, post }) => {
  if (!post) {
    return <></>
  }

  const postHref = paths.post_read(post.id.toString())

  const componentClassName = classNames(styles.component, className)

  return (
    <Card
      className={componentClassName}
      title={post.title}
      extra={<ReadMore href={postHref} />}
      styles={CARD_STYLES}
    >
      <TagsStatic
        className={styles.tags}
        tags={post.tags}
      />
      <CollapsibleText text={post.description} />
      <PostAuthor
        componentClassName={styles.author}
        name={post.author?.name}
      />
      <PostDate
        className={styles.date}
        date={post.createdAt}
      />
    </Card>
  )
}
