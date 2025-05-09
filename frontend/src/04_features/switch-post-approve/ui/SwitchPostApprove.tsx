"use client"

import { updatePost } from "@/05_entities/post/api"
import { useUpdateData } from "@/06_shared/model/hooks"
import { Switcher } from "@/06_shared/ui/switcher"
import { FC, useState } from "react"

type TProps = {
  postId: number
  defaultValue: boolean
  className?: string
}

export const SwitchPostApprove: FC<TProps> = ({
  postId,
  defaultValue,
  className,
}) => {
  const [status, setStatus] = useState(defaultValue)
  const { isLoading, handleApiCall } = useUpdateData()

  const onChange = async (checked: boolean) => {
    await handleApiCall({
      apiFunction: () => updatePost(postId, { isPublish: checked }),
      onSuccessCallback: () => setStatus(checked),
    })
  }

  return (
    <Switcher
      checked={status}
      onChange={onChange}
      loading={isLoading}
      className={className}
    />
  )
}
