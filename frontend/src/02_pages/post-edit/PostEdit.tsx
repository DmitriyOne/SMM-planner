import { TPost } from "@/05_entities/post/model"
import { FC } from "react"
import { Container } from "@/06_shared/ui/container"
import { PostEditWidget } from "@/03_widgets/post-edit/ui"

import styles from "./post-edit.module.scss"

type TProps = {
  post: TPost
}

export const PostEditPage: FC<TProps> = ({ post }) => {
  if (!post) {
    return <></>
  }

  return (
    <Container className={styles.component}>
      <PostEditWidget post={post} />
    </Container>
  )
}
