import { FC } from "react"
import classNames from "classnames"
import { Button, Input } from "antd"

import styles from "./styles.module.scss"

type TProps = {
  className?: string
  inputId: string
  inputClassName?: string
  buttonClassName?: string
  onSubmit?: (formData: FormData) => void
}

export const InputSubmitForm: FC<TProps> = ({
  className,
  inputId,
  inputClassName,
  buttonClassName,
  onSubmit,
}) => {
  const componentClassName = classNames(styles.component, className)
  const inputClass = classNames(styles.input, inputClassName)
  const buttonClass = classNames(styles.button, buttonClassName)

  return (
    <form
      action={onSubmit}
      className={componentClassName}
    >
      <Input
        id={inputId}
        name={inputId}
        className={inputClass}
        placeholder='Tech...'
      />
      <Button
        className={buttonClass}
        type='primary'
        htmlType='submit'
      >
        Submit
      </Button>
    </form>
  )
}
