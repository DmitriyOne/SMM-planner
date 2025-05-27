"use client"

import { FC } from "react"
import { Button } from "antd"
import { useDeleteUser } from "../model/hooks"

import { IDS } from "../config"

import styles from "./delete-user.module.scss"
import classNames from "classnames"
import { ConfirmModal } from "@/05_entities/confirm-modal/ui"

type TProps = {
  className?: string
  buttonClassName?: string
  isPositionAbsolute?: boolean
}

export const DeleteUser: FC<TProps> = ({
  className,
  buttonClassName,
  isPositionAbsolute,
}) => {
  const {
    userId,
    isLoading,
    isPending,
    formRef,
    formAction,
    isShowModal,
    handleModalOpen,
    onDelete,
    handleModalClose,
  } = useDeleteUser()

  const componentClass = classNames(styles.component, className, {
    [styles.absolute]: isPositionAbsolute,
  })
  const buttonClass = classNames(styles.button, buttonClassName)

  return (
    <form
      ref={formRef}
      className={componentClass}
      action={formAction}
    >
      <input
        type='hidden'
        name={IDS.user_id}
        id={IDS.user_id}
        value={userId ?? ""}
      />
      <Button
        danger
        htmlType='button'
        className={buttonClass}
        loading={isLoading || isPending}
        onClick={handleModalOpen}
      >
        Delete
      </Button>

      {isShowModal && (
        <ConfirmModal
          isLoading={isLoading}
          isOpen={isShowModal}
          title='Delete your account?'
          handleOk={onDelete}
          handleCancel={handleModalClose}
        >
          This action is irreversible. Make sure you are confident.
        </ConfirmModal>
      )}
    </form>
  )
}
