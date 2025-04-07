import { TPost } from "@/05_entities/post/model"
import { FC } from "react"

import { Col, Row } from "antd"
import { PostGallery } from "@/05_entities/post-gallery/ui"
import { TImage } from "@/06_shared/model/types"

import { PostStatus } from "@/05_entities/post-status/ui"
import { PostDate } from "@/05_entities/post-date/ui"
import { PostAuthor } from "@/05_entities/post-author/ui"

import { UpdatePostTitle } from "@/04_features/update-post-title/ui"
import { UpdatePostDescription } from "@/04_features/update-post-description/ui"

import { SwitchPostApprove } from "@/04_features/switch-post-approve/ui"
import { SwitchPostPublish } from "@/04_features/switch-post-publish/ui"

import styles from "./post-edit.module.scss"
import { TagsStatic } from "@/05_entities/tags/ui/tags-static"

type TProps = {
  post: TPost
}

export const PostEditWidget: FC<TProps> = ({ post }) => {
  const gallery: TImage[] = [
    {
      src: post.image,
      alt: post.title,
    },
  ]

  return (
    <>
      <Row wrap={false}>
        <Col
          flex='400px'
          className={styles.colLeft}
        >
          <PostGallery gallery={gallery} />
        </Col>
        <Col
          flex='auto'
          className={styles.colRight}
        >
          <TagsStatic tags={post.tags} />
          <UpdatePostTitle title={post.title} />
          <UpdatePostDescription
            className={styles.description}
            description={post.description}
          />

          <div className={styles.statusContainer}>
            <PostStatus
              question='Is the post published?'
              status={post.isPublish}
            />
            <SwitchPostPublish
              className={styles.switcher}
              defaultValue={post.isPublish}
            />
          </div>

          <div className={styles.statusContainer}>
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

          <PostAuthor
            componentClassName={styles.author}
            title='Author: '
            name={post.author?.name}
          />
          <PostDate
            title='Created at:'
            date={post.createdAt}
          />
          <PostDate
            title='Updated at:'
            date={post.updatedAt}
          />
        </Col>
      </Row>
    </>
  )
}
