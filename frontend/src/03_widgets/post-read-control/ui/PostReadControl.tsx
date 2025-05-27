import { FC } from "react"
import { DeletePost } from "@/04_features/delete-post/ui"
import { LinkEdit } from "@/06_shared/ui/link-edit/ui"
import { paths } from "@/06_shared/config/routing"
import classNames from "classnames"
import { TPost } from "@/05_entities/post/model/types"
import { getAuthorizedUserByToken } from "@/05_entities/user/lib"

import { isAuthor } from "@/05_entities/post/lib"

import styles from "./post-read-control.module.scss"

type TProps = {
  post: TPost
  className?: string
}

export const PostReadControl: FC<TProps> = async ({ post, className }) => {
  const user = await getAuthorizedUserByToken()
  const author = isAuthor(post.authorId, user?.id)

  const canSeeControls =
    author || user?.role === "admin" || user?.role === "super_admin"

  if (!canSeeControls) {
    return <></>
  }

  const postIdString = String(post.id)

  const componentClassName = classNames(styles.component, className)

  return (
    <div className={componentClassName}>
      <DeletePost
        className={styles.delete}
        postId={postIdString}
      />
      <LinkEdit redirectPath={paths.post_edit(postIdString)} />
    </div>
  )
}
