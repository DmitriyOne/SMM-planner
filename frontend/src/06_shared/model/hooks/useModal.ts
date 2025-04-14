import { useState } from "react"

interface IReturn {
  isShowModal: boolean
  handleModalOpen: () => void
  handleModalClose: () => void
  handleToggleModal: () => void
}

export const useModal = (): IReturn => {
  const [isShowModal, setShowModal] = useState(false)

  const handleModalOpen = () => setShowModal(true)
  const handleModalClose = () => setShowModal(false)
  const handleToggleModal = () => setShowModal((isOpen) => !isOpen)

  return {
    isShowModal,
    handleModalOpen,
    handleModalClose,
    handleToggleModal,
  }
}
