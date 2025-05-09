import { useState } from "react"
import { UploadRequestOption } from "rc-upload/lib/interface"
import { message } from "antd"
import { uploadImageToCloudinary } from "@/04_features/post-gallery-controls/api"
import {
  POST_UPLOAD_ERROR_MSG,
  POST_UPLOAD_SUCCESS_MSG,
} from "../config/messages"

export const usePostUpload = () => {
  const [file, setFile] = useState<string | null>(null)
  const [uploadKey, setUploadKey] = useState(0)

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
    setUploadKey((prev) => prev + 1)
  }

  return {
    file,
    uploadKey,
    onUpload,
    onRemoveFile,
  }
}
