import { uploadImageToCloudinary } from "@/04_features/post-gallery-controls/api"
import { useLoading } from "@/06_shared/model/hooks"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import {
  POST_UPLOAD_ERROR_MSG,
  POST_UPLOAD_SUCCESS_MSG,
  SOMETHING_WENT_WRONG,
} from "../config"
import { message } from "antd"
import { TSubmitValues } from "./types"
import { TPostCreateBody } from "@/05_entities/post/model"
import { createPost } from "@/05_entities/post/api"
import { UploadRequestOption } from "rc-upload/lib/interface"

export const usePostCreateForm = () => {
  const [form] = useForm()
  const [file, setFile] = useState<string | null>(null)
  const [uploadKey, setUploadKey] = useState(0)
  const { isLoading, startLoading, stopLoading } = useLoading()

  const onUpload = async (option: UploadRequestOption) => {
    const { file, onSuccess, onError } = option

    try {
      const response = await uploadImageToCloudinary(file)
      message.success(POST_UPLOAD_SUCCESS_MSG)
      onSuccess?.(response, file)
      setFile(response.secure_url)
    } catch (error) {
      onError?.(error as Error, file)
      message.error(POST_UPLOAD_ERROR_MSG)
    }
  }

  const onRemoveFile = () => {
    setFile(null)
  }

  const onSubmit = async (values: TSubmitValues) => {
    const { title, description, approved, publish } = values

    startLoading()
    const body: TPostCreateBody = {
      title,
      description,
      isApproved: approved,
      isPublish: publish,
      image: file,
      tags: [],
    }

    try {
      await createPost(body)
      message.success(POST_UPLOAD_SUCCESS_MSG)
      form.resetFields()
      setFile(null)
      setUploadKey((prev) => prev + 1)
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
    file,
    isLoading,
    uploadKey,
    onUpload,
    onSubmit,
    onRemoveFile,
  }
}
