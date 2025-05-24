import { deleteComment, getCommentsByPostId } from "@/05_entities/comment/api"
import { TComment } from "@/05_entities/comment/model/types"
import { getUser } from "@/05_entities/user/api"
import { TUser } from "@/05_entities/user/model/types"
import { getToken } from "@/06_shared/api/auth"
import { useLoading } from "@/06_shared/model/hooks"
import { message } from "antd"
import { useEffect, useState } from "react"
import { MESSAGE } from "../../config"
import { isValidArray } from "@/06_shared/model/utils"

export const usePostComments = (postId: string) => {
  const { isLoading, startLoading, stopLoading } = useLoading(true)

  const [comments, setComments] = useState<TComment[]>([])
  const [user, setUser] = useState<TUser | null>(null)

  useEffect(() => {
    if (isValidArray(comments) && user) return

    load()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, comments, user])

  const load = async () => {
    startLoading()
    try {
      const token = await getToken()
      const [comments, user] = await Promise.all([
        getCommentsByPostId(postId),
        getUser(token),
      ])
      setComments(comments)
      setUser(user)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : MESSAGE.SOMETHING_WENT_WRONG
      message.error(errorMessage)
    } finally {
      stopLoading()
    }
  }

  const handleAddComment = (comment: TComment) => {
    setComments((prev) => [...prev, comment])
  }

  const handleDelete = async (postId: string, commentId: string) => {
    try {
      const token = await getToken()
      await deleteComment(token, postId, commentId)
      setComments((prev) =>
        prev.filter((comment) => comment.id !== Number(commentId)),
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return {
    isLoading,
    comments,
    user,
    handleAddComment,
    handleDelete,
  }
}
