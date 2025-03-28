import { Banner } from "@/03_widgets/banner/ui"
import { PopularTags } from "@/03_widgets/popular-tags/ui"
import { PostCardList } from "@/03_widgets/post-card-list/ui"
import { Container } from "@/06_shared/ui/container"

import styles from "./feed.module.scss"
import Title from "antd/es/typography/Title"
import { TPost } from "@/05_entities/post-card/model"
import { FC } from "react"

type TProps = {
  posts: TPost[]
}

export const Feed: FC<TProps> = ({ posts }) => {
  return (
    <>
      <Banner />
      <Container className={styles.container}>
        <div className={styles.feed}>
          <Title
            className={styles.title}
            level={3}
          >
            Global Feed
          </Title>
          <PostCardList posts={posts} />
        </div>
        <PopularTags componentClassName={styles.tags} />
      </Container>
    </>
  )
}
