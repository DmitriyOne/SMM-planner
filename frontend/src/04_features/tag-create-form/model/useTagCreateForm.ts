import { useLoading } from "@/06_shared/model/hooks"
import { useForm } from "antd/es/form/Form"
import { SOMETHING_WENT_WRONG, TAG_CREATED_SUCCESS_MSG } from "../config"
import { message } from "antd"
import { TSubmitValues } from "./types"
import { createTag } from "@/05_entities/tags/api/create-tag"
import { getToken } from "@/06_shared/api/auth"

export const useTagCreateForm = () => {
  const [form] = useForm()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const onSubmit = async (values: TSubmitValues) => {
    const { title } = values

    startLoading()

    try {
      const token = await getToken()
      await createTag(token, title)
      message.success(TAG_CREATED_SUCCESS_MSG)
      form.resetFields()
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
