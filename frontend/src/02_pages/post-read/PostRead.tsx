import { TPost } from "@/05_entities/post/model"
import styles from "./post-read.module.scss"
import { FC } from "react"
import { Container } from "@/06_shared/ui/container"
import { PostView } from "@/03_widgets/post-view/ui"

type TProps = {
  post: TPost
}

export const PostRead: FC<TProps> = ({ post }) => {
  if (!post) {
    return <></>
  }

  return (
    <Container className={styles.component}>
      <PostView post={post} />
    </Container>
  )
}
