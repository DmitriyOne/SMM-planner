import { FC } from "react"
import classNames from "classnames"
import { Button, Input } from "antd"

import styles from "./styles.module.scss"

type TProps = {
  className?: string
  inputClassName?: string
  buttonClassName?: string
  value?: string
  onChange?: (value: string) => void
  onSubmit?: () => void
}

export const InputSubmitForm: FC<TProps> = ({
  className,
  inputClassName,
  buttonClassName,
  value,
  onChange,
  onSubmit,
}) => {
  const componentClassName = classNames(styles.component, className)
  const inputClass = classNames(styles.input, inputClassName)
  const buttonClass = classNames(styles.button, buttonClassName)

  return (
    <div className={componentClassName}>
      <Input
        className={inputClass}
        placeholder='Tech...'
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <Button
        className={buttonClass}
        type='primary'
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  )
}
