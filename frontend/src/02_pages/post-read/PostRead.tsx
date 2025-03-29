import { TPost } from "@/05_entities/post/model"
import styles from "./post-read.module.scss"
import { FC } from "react"
import { Container } from "@/06_shared/ui/container"
import { PostViewWidget } from "@/03_widgets/post-view/ui"

type TProps = {
  post: TPost
}

export const PostReadPage: FC<TProps> = ({ post }) => {
  if (!post) {
    return <></>
  }

  return (
    <Container className={styles.component}>
      <PostViewWidget post={post} />
    </Container>
  )
}
