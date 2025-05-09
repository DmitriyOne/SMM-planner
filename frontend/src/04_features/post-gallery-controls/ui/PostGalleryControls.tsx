import { TImage } from "@/06_shared/model/types"
import classNames from "classnames"
import { Dispatch, FC, SetStateAction } from "react"

import { isValidArray } from "@/06_shared/model/utils"

import { ConfirmModal } from "@/05_entities/confirm-modal/ui"

import { UploadImage } from "@/06_shared/ui/upload-image"

import { usePostGalleryControls } from "../lib"

import styles from "./post-gallery-controls.module.scss"

type TProps = {
  postId: number
  gallery: TImage[]
  className?: string
  setNewGallery: Dispatch<SetStateAction<TImage[]>>
}

export const PostGalleryControls: FC<TProps> = ({
  postId,
  gallery,
  className,
  setNewGallery,
}) => {
  const {
    isShowModal,
    isLoading,
    handleModalOpen,
    handleUpload,
    handleDelete,
    handleCancel,
  } = usePostGalleryControls(postId, setNewGallery)

  const addButtonTitle = isValidArray(gallery) ? "Upload more" : "Upload"

  const componentClassName = classNames(styles.component, className)
  const deleteButtonClassName = classNames(styles.button, styles.delete)

  return (
    <>
      <div className={componentClassName}>
        {isValidArray(gallery) && (
          <button
            className={deleteButtonClassName}
            onClick={handleModalOpen}
            disabled={isLoading}
          >
            Delete
          </button>
        )}

        <UploadImage
          className={styles.upload}
          handleUpload={handleUpload}
          isShowUploadList={false}
          isLoading={isLoading}
        >
          {addButtonTitle}
        </UploadImage>
      </div>

      {isShowModal && (
        <ConfirmModal
          isLoading={isLoading}
          isOpen={isShowModal}
          title='Delete all images'
          handleOk={handleDelete}
          handleCancel={handleCancel}
        >
          This action is irreversible. Make sure you are confident.
        </ConfirmModal>
      )}
    </>
  )
}
