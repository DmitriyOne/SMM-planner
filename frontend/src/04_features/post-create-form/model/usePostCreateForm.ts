import { useLoading } from "@/06_shared/model/hooks"
import { useForm } from "antd/es/form/Form"
import { POST_UPLOAD_SUCCESS_MSG, SOMETHING_WENT_WRONG } from "../config"
import { message } from "antd"
import { TSubmitValues } from "./types"
import { TPostCreateBody } from "@/05_entities/post/model/types"
import { createPost } from "@/05_entities/post/api"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { isValidArray } from "@/06_shared/model/utils"
import { getToken } from "@/06_shared/api/auth"

export const usePostCreateForm = (
  file: string | null,
  selectedTags: TTag[],
  onRemoveFile: () => void,
  onRemoveSelectedTags: () => void,
) => {
  const [form] = useForm()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const onSubmit = async (values: TSubmitValues) => {
    const { title, description, approved, publish } = values

    startLoading()
    const tagTitles = isValidArray(selectedTags)
      ? selectedTags.map((tag) => ({ title: tag.title }))
      : []
    const body: TPostCreateBody = {
      title,
      description,
      isApproved: approved,
      isPublish: publish,
      image: file,
      tags: tagTitles,
    }

    try {
      const token = await getToken()
      await createPost(token, body)
      message.success(POST_UPLOAD_SUCCESS_MSG)
      form.resetFields()
      onRemoveFile()
      onRemoveSelectedTags()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : SOMETHING_WENT_WRONG
      message.error(errorMessage)
    } finally {
      stopLoading()
    }
  }

  return {
    form,
    isLoading,
    onSubmit,
  }
}
