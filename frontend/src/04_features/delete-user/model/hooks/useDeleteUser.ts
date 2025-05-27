import { useUserContext } from "@/05_entities/user/model/context"
import { useActionState, useEffect, useRef } from "react"
import { deleteUserAction } from "../actions"
import { message } from "antd"
import { MESSAGE } from "../../config"
import { delay } from "@/06_shared/model/utils"
import { TActionState } from "../types"
import { useRouter } from "next/navigation"
import { paths } from "@/06_shared/config/routing"
import { useModal } from "@/06_shared/model/hooks"

export const useDeleteUser = () => {
  const router = useRouter()
  const { isShowModal, handleModalClose, handleModalOpen } = useModal()
  const { isLoading, user } = useUserContext()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(deleteUserAction, null)

  useEffect(() => {    
    if (state?.success) {
      success(state)
    } else if (state?.errors?.api) {
      message.error(state.errors?.api)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const success = async (state: TActionState) => {
    message.success(state.successMessage || MESSAGE.USER_DELETED, 3)
    await delay(500)
    message.success(MESSAGE.REDIRECT_TO_LOGIN, 3)
    formRef.current?.reset()
    const inputs = formRef.current?.querySelectorAll("input")
    inputs?.forEach((input) => (input.value = ""))
    router.replace(paths.login)
  }

  const onDelete = () => {
    formRef.current?.requestSubmit()
  }

  return {
    userId: user?.id as string,
    isLoading,
    state,
    formAction,
    isPending,
    formRef,
    isShowModal,
    handleModalClose,
    handleModalOpen,
    onDelete,
  }
}
