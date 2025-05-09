import { Container } from "@/06_shared/ui"

import Title from "antd/es/typography/Title"
import Text from "antd/es/typography/Text"

import { PostCreateForm } from "@/04_features/post-create-form/ui"

import styles from "./post-create.module.scss"

export const PostCreatePage = () => {
  return (
    <Container className={styles.component}>
      <Title>Create new post</Title>
      <Text>Fill all fields and enjoy new post</Text>
      <PostCreateForm />
    </Container>
  )
}
