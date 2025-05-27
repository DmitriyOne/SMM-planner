"use client"

import { Button } from "antd"
import { IDS } from "../../config"
import { useCommentCreateForm } from "../../model/hooks"
import { FormFieldError } from "@/06_shared/ui"
import { FC } from "react"
import { TComment } from "@/05_entities/comment/model/types"

import styles from "./comment-create-form.module.scss"

type TProps = {
  postId: string
  onSuccess: (comment: TComment) => void
}

export const CommentCreateForm: FC<TProps> = ({ postId, onSuccess }) => {
  const { formRef, state, isPending, formAction } =
    useCommentCreateForm(onSuccess)

  return (
    <form
      ref={formRef}
      action={formAction}
      className={styles.component}
    >
      <input
        type='hidden'
        name={IDS.post_id}
        id={IDS.post_id}
        value={postId}
      />
      <textarea
        className={styles.textarea}
        id={IDS.comment}
        name={IDS.comment}
        rows={4}
        placeholder='Leave a comment'
      />
      <FormFieldError errors={state?.errors?.comment} />
      <Button
        type='primary'
        htmlType='submit'
        disabled={isPending}
        loading={isPending}
        className={styles.button}
      >
        Submit
      </Button>
    </form>
  )
}
