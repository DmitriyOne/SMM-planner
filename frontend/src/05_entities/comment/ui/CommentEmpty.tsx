import Text from "antd/es/typography/Text"

import styles from "./comment-empty.module.scss"

export const CommentEmpty = () => {
  return (
    <Text className={styles.component}>
      Be the first! Share what you think about the post.
    </Text>
  )
}
