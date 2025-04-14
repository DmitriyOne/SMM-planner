import { PostStatus } from "@/05_entities/post-status/ui"
import { SwitchPostPublish } from "@/04_features/switch-post-publish/ui"
import { FC } from "react"
import { TPost } from "@/05_entities/post/model"
import { SwitchPostApprove } from "@/04_features/switch-post-approve/ui"

import styles from "./post-status-control.module.scss"

type TProps = {
  post: TPost
}

export const PostStatusControl: FC<TProps> = ({ post }) => {
  return (
    <>
      <div className={styles.container}>
        <PostStatus
          question='Is the post published?'
          status={post.isPublish}
        />
        <SwitchPostPublish
          className={styles.switcher}
          defaultValue={post.isPublish}
        />
      </div>

      <div className={styles.container}>
        <PostStatus
          className={styles.statusApproved}
          question='Is the post approved?'
          status={post.isApproved}
        />
        <SwitchPostApprove
          className={styles.switcher}
          defaultValue={post.isApproved}
        />
      </div>
    </>
  )
}
