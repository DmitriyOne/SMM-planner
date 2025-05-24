import { Modal } from "antd"
import { FC, PropsWithChildren } from "react"

type TConfirmModalProps = {
  title: string
  isLoading?: boolean
  isOpen: boolean
  okText?: string
  cancelText?: string
  handleOk: () => Promise<void> | void
  handleCancel: () => void
} & PropsWithChildren

export const ConfirmModal: FC<TConfirmModalProps> = ({
  title,
  okText = "Accept",
  cancelText = "Cancel",
  handleOk,
  handleCancel,
  isLoading,
  isOpen,
  children,
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      okText={isLoading ? "Loading" : okText}
      cancelText={cancelText}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        loading: isLoading,
      }}
    >
      {children}
    </Modal>
  )
}
