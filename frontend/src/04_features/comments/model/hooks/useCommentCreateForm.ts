import { useActionState, useEffect, useRef } from "react"
import { createCommentAction } from "../actions"
import { message } from "antd"
import { TComment } from "@/05_entities/comment/model/types"

export const useCommentCreateForm = (
  onSuccess: (comment: TComment) => void,
) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(
    createCommentAction,
    null,
  )

  useEffect(() => {
    if (state?.success) {
      onSuccess(state.comment as TComment)
      if (formRef.current) {
        formRef.current.reset()
        const textareas = formRef.current?.querySelectorAll("textarea")
        textareas?.forEach((textarea) => (textarea.value = ""))
      }
    } else if (state?.errors?.api) {
      message.error(state.errors?.api)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return {
    formRef,
    state,
    isPending,
    formAction,
  }
}
