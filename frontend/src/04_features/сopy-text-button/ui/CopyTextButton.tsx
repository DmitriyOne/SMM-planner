"use client"

import { Button, message } from "antd"
import { CopyOutlined } from "@ant-design/icons"
import { FC } from "react"
import { copyToClipboard } from "../model/utils"
import classNames from "classnames"
import { MESSAGE_SUCCESS } from "../config"

import styles from "./copy-text-button.module.scss"

type TProps = {
  text?: string
  className?: string
  messageSuccess?: string
}

export const CopyTextButton: FC<TProps> = ({
  text,
  className,
  messageSuccess = MESSAGE_SUCCESS,
}) => {
  const handleCopy = async () => {
    if (text) {
      await copyToClipboard(text)
      message.success(messageSuccess)
    }
  }

  const componentClassName = classNames(styles.component, className)

  return (
    <Button
      className={componentClassName}
      type='default'
      icon={<CopyOutlined />}
      onClick={handleCopy}
      size='small'
    />
  )
}
