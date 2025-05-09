import { Container } from "@/06_shared/ui"

import Title from "antd/es/typography/Title"

import { TagCreateForm } from "@/04_features/tag-create-form/ui"

import styles from "./tag-create.module.scss"

export const TagCreatePage = () => {
  return (
    <Container className={styles.component}>
      <Title>Create new tag</Title>
      <TagCreateForm />
    </Container>
  )
}
