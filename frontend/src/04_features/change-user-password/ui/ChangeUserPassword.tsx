"use client"

import { INPUT_ID } from "../config"
import InputPassword from "antd/es/input/Password"
import { FormFieldError } from "@/06_shared/ui"
import { Button } from "antd"

import { useChangePassword } from "../model/hooks"

import styles from "./change-user-password.module.scss"

export const ChangeUserPassword = () => {
  const { formRef, formAction, state, isPending } = useChangePassword()

  return (
    <form
      ref={formRef}
      action={formAction}
      className={styles.component}
    >
      <div className={styles.field}>
        <label
          htmlFor={INPUT_ID.old_password}
          className={styles.label}
        >
          Old password
        </label>
        <InputPassword
          id={INPUT_ID.old_password}
          name={INPUT_ID.old_password}
          required
        />
        <FormFieldError errors={state?.errors?.oldPassword} />
      </div>
      <div className={styles.field}>
        <label
          htmlFor={INPUT_ID.new_password}
          className={styles.label}
        >
          New password
        </label>
        <InputPassword
          id={INPUT_ID.new_password}
          name={INPUT_ID.new_password}
          required
        />
        <FormFieldError errors={state?.errors?.newPassword} />
      </div>
      <div className={styles.field}>
        <label
          htmlFor={INPUT_ID.confirm_password}
          className={styles.label}
        >
          Confirm Password
        </label>
        <InputPassword
          id={INPUT_ID.confirm_password}
          name={INPUT_ID.confirm_password}
          required
        />
        <FormFieldError errors={state?.errors?.confirmPassword} />
      </div>
      <Button
        type='primary'
        htmlType='submit'
        disabled={isPending}
        loading={isPending}
        className={styles.button}
      >
        Submit
      </Button>
    </form>
  )
}
