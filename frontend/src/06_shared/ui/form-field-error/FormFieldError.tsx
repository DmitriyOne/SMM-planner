import { FC } from "react"

import { isValidArray } from "@/06_shared/model/utils"

import styles from "./form-field-error.module.scss"

type TProps = {
  errors?: string[]
}

export const FormFieldError: FC<TProps> = ({ errors }) => {
  if (!errors || !isValidArray(errors)) {
    return <></>
  }

  return (
    <ul className={styles.component}>
      {errors.map((error) => (
        <li
          key={error}
          className={styles.item}
        >
          {error}
        </li>
      ))}
    </ul>
  )
}
