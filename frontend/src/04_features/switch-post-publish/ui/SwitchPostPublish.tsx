"use client"

import { deletePost } from "@/04_features/delete-post/api"
import { useUpdateData } from "@/06_shared/model/hooks"
import { Switcher } from "@/06_shared/ui/switcher"
import { FC, useState } from "react"

type TProps = {
  defaultValue: boolean
  className?: string
}

export const SwitchPostPublish: FC<TProps> = ({ defaultValue, className }) => {
  const [status, setStatus] = useState(defaultValue)
  const { isLoading, handleApiCall } = useUpdateData()

  const onChange = async (checked: boolean) => {
    await handleApiCall({
      apiFunction: () => deletePost("9"),
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
