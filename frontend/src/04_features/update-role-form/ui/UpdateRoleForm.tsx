"use client"

import { Button, Input } from "antd"
import { IDS, RADIO_OPTIONS } from "../config"
import { FormFieldError } from "@/06_shared/ui"
import { useUpdateRoleForm } from "../model/hooks"
import RadioGroup from "antd/es/radio/group"

import styles from "./update-role-form.module.scss"

export const UpdateRoleForm = () => {
  const { isLoading, isPending, state, formRef, formAction } =
    useUpdateRoleForm()

  return (
    <form
      ref={formRef}
      action={formAction}
      className={styles.component}
    >
      <div className={styles.field}>
        <label
          htmlFor={IDS.user_id}
          className={styles.label}
        >
          User ID
        </label>
        <Input
          id={IDS.user_id}
          name={IDS.user_id}
          type='text'
          required
        />
        <FormFieldError errors={state?.errors?.userId} />
      </div>
      <div className={styles.field}>
        <RadioGroup
          name={IDS.role}
          options={RADIO_OPTIONS}
        />
        <FormFieldError errors={state?.errors?.role} />
      </div>
      <Button
        type='primary'
        htmlType='submit'
        disabled={isPending || isLoading}
        loading={isPending || isLoading}
      >
        Submit
      </Button>
    </form>
  )
}
