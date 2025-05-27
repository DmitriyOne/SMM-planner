"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"

import classNames from "classnames"
import { message } from "antd"
import { useLoading, useModal } from "@/06_shared/model/hooks"
import { ConfirmModal } from "@/05_entities/confirm-modal/ui"
import { paths } from "@/06_shared/config/routing"

import { getToken } from "@/06_shared/api/auth"
import { MESSAGE } from "../config"

import styles from "./delete-tag.module.scss"
import { deleteTag } from "@/05_entities/tags/api"

type TProps = {
  tagId: string
  className?: string
}

export const DeleteTag: FC<TProps> = ({ tagId, className }) => {
  const router = useRouter()
  const { isShowModal, handleModalOpen, handleModalClose } = useModal()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const handleDelete = async () => {
    startLoading()
    try {
      const token = await getToken()
      await deleteTag(token, tagId)
      message.success(MESSAGE.SUCCESS)
      router.replace(paths.home)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("error", error)
      message.error(MESSAGE.SOMETHING_WENT_WRONG)
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
          title='Delete Tag'
          handleOk={handleDelete}
          handleCancel={handleCancel}
        >
          This action is irreversible. Make sure you are confident.
        </ConfirmModal>
      )}
    </>
  )
}
