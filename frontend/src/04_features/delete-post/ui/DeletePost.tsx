"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"

import classNames from "classnames"
import { message } from "antd"
import { useLoading, useModal } from "@/06_shared/model/hooks"
import { ConfirmModal } from "@/05_entities/confirm-modal/ui"
import { POST_DELETED_ERROR_MSG, POST_DELETED_SUCCESS_MSG } from "../config"
import { paths } from "@/06_shared/config/routing"
import { deletePost } from "../api"

import styles from "./delete-post.module.scss"

type TProps = {
  postId: string
  className?: string
}

export const DeletePost: FC<TProps> = ({ postId, className }) => {
  const router = useRouter()
  const { isShowModal, handleModalOpen, handleModalClose } = useModal()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const handleDelete = async () => {
    startLoading()
    try {
      // TODO: check user authorization and is he the owner
      await deletePost(postId)
      message.success(POST_DELETED_SUCCESS_MSG)
      router.push(paths.home)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("error", error)
      message.error(POST_DELETED_ERROR_MSG)
    } finally {
      stopLoading()
    }
  }

  const handleCancel = () => {
    stopLoading()
    handleModalClose()
  }

  const componentClassName = classNames(styles.component, className)

  return (
    <>
      <button
        className={componentClassName}
        onClick={handleModalOpen}
        disabled={isLoading}
      >
        Delete
      </button>

      {isShowModal && (
        <ConfirmModal
          isLoading={isLoading}
          isOpen={isShowModal}
          title='Delete Post'
          handleOk={handleDelete}
          handleCancel={handleCancel}
        >
          This action is irreversible. Make sure you are confident.
        </ConfirmModal>
      )}
    </>
  )
}
