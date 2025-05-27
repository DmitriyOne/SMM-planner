import { TPost } from "@/05_entities/post/model/types"
import styles from "./tag-post-list.module.scss"
import { FC, use } from "react"
import { PostCardList } from "@/03_widgets/post-card-list/ui"

type TProps = {
  getPostsByTagId: Promise<TPost[]>
}

export const TagPostList: FC<TProps> = ({ getPostsByTagId }) => {
  const posts = use(getPostsByTagId)

  return (
    <PostCardList
      className={styles.component}
      itemClassName={styles.item}
      posts={posts}
    />
  )
}
