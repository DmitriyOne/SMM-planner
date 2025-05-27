"use client"

import { FC } from "react"

import { useUpdatePostField } from "@/05_entities/post/model/hooks"
import { Switcher } from "@/06_shared/ui/switcher"

type TProps = {
  postId: number
  defaultValue: boolean
  className?: string
}

export const SwitchPostPublish: FC<TProps> = ({
  postId,
  defaultValue,
  className,
}) => {
  const { isLoading, newValue, setNewValue, handleSuccess } =
    useUpdatePostField(postId, defaultValue, "isPublish")

  const onChange = (checked: boolean) => {
    setNewValue(checked)
    handleSuccess()
  }

  return (
    <Switcher
      checked={newValue as boolean}
      onChange={onChange}
      loading={isLoading}
      className={className}
    />
  )
}
