import { FC } from "react"
import classNames from "classnames"

import styles from "./style.module.scss"

type TProps = {
  className?: string
  buttonClassName?: string
  cancelButtonClassName?: string
  saveButtonClassName?: string
  handleCancel: () => void
  handleSave: () => void
}

export const SaveCancelForm: FC<TProps> = ({
  className,
  buttonClassName,
  cancelButtonClassName,
  saveButtonClassName,
  handleCancel,
  handleSave,
}) => {
  const componentClassName = classNames(styles.component, className)

  const buttonClass = classNames(styles.button, buttonClassName)
  const cancelButtonClass = classNames(buttonClass, cancelButtonClassName)
  const saveButtonClass = classNames(buttonClass, saveButtonClassName)

  return (
    <div className={componentClassName}>
      <button
        className={cancelButtonClass}
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
        className={saveButtonClass}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  )
}
