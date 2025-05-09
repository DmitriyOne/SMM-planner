import { useModal, useLoading } from "@/06_shared/model/hooks"
import { Dispatch, SetStateAction } from "react"
import { message } from "antd"
import { TImage } from "@/06_shared/model/types"
import { UploadRequestOption } from "rc-upload/lib/interface"
import { uploadImageToCloudinary } from "../api"
import {
  POST_GALLERY_UPDATED_ERROR_MSG,
  POST_GALLERY_UPDATED_SUCCESS_MSG,
  POST_GALLERY_UPLOADED_ERROR_MSG,
} from "../config"
import { updatePost } from "@/05_entities/post/api"

export const usePostGalleryControls = (
  postId: number,
  setNewGallery: Dispatch<SetStateAction<TImage[]>>,
) => {
  const { isShowModal, handleModalOpen, handleModalClose } = useModal()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const handleUpload = async (option: UploadRequestOption) => {
    const { file, onSuccess, onError } = option

    try {
      startLoading()
      const response = await uploadImageToCloudinary(file)
      await updatePost(postId, { image: response.secure_url })
      message.success(POST_GALLERY_UPDATED_SUCCESS_MSG)
      onSuccess?.(response, file)
      setNewGallery([{ src: response.secure_url, alt: "" }])
    } catch (error) {
      onError?.(error as Error, file)
      message.error(POST_GALLERY_UPLOADED_ERROR_MSG)
    } finally {
      stopLoading()
    }
  }

  const handleDelete = async () => {
    startLoading()
    try {
      await updatePost(postId, { image: null })
      setNewGallery([])
      handleModalClose()
      message.success(POST_GALLERY_UPDATED_SUCCESS_MSG)
    } catch {
      message.error(POST_GALLERY_UPDATED_ERROR_MSG)
    } finally {
      stopLoading()
    }
  }

  const handleCancel = () => {
    stopLoading()
    handleModalClose()
  }

  return {
    isShowModal,
    handleModalOpen,
    handleModalClose,
    isLoading,
    handleUpload,
    handleDelete,
    handleCancel,
  }
}
