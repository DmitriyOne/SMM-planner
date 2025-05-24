"use client"

import Title from "antd/es/typography/Title"
import { FC } from "react"

import { usePostComments } from "../model/hooks"
import { CommentListSkeleton } from "@/04_features/comments/ui/list/CommentListSkeleton"
import { CommentList } from "@/04_features/comments/ui/list"
import { CommentCreateForm } from "@/04_features/comments/ui/form"

type TProps = {
  postId: number
}

export const PostComments: FC<TProps> = ({ postId }) => {
  const { isLoading, comments, user, handleAddComment, handleDelete } =
    usePostComments(postId.toString())

  return (
    <>
      <Title level={3}>Comments</Title>
      {isLoading ? (
        <CommentListSkeleton />
      ) : (
        <>
          <CommentList
            comments={comments}
            user={user}
            handleDelete={handleDelete}
          />
          <CommentCreateForm
            postId={postId.toString()}
            onSuccess={handleAddComment}
          />
        </>
      )}
    </>
  )
}
