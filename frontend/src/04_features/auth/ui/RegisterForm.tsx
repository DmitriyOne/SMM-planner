"use client"

import { AUTH_INPUT_IDS } from "../config"

import { Button, Checkbox, Input } from "antd"
import InputPassword from "antd/es/input/Password"

import { FormFieldError } from "@/06_shared/ui"

import Link from "next/link"
import { paths } from "@/06_shared/config/routing"

import { useRegister } from "../model/hooks"

import styles from "./styles.module.scss"

export const RegisterForm = () => {
  const { formRef, state, isPending, formAction } = useRegister()

  return (
    <form
      ref={formRef}
      action={formAction}
      className={styles.form}
    >
      <div className={styles.field}>
        <label
          htmlFor={AUTH_INPUT_IDS.name}
          className={styles.label}
        >
          Name
        </label>
        <Input
          id={AUTH_INPUT_IDS.name}
          name={AUTH_INPUT_IDS.name}
          required
        />
        <FormFieldError errors={state?.errors?.name} />
      </div>
      <div className={styles.field}>
        <label
          htmlFor={AUTH_INPUT_IDS.email}
          className={styles.label}
        >
          Email
        </label>
        <Input
          id={AUTH_INPUT_IDS.email}
          name={AUTH_INPUT_IDS.email}
          type='email'
          required
        />
        <FormFieldError errors={state?.errors?.email} />
      </div>

      <div className={styles.field}>
        <label
          htmlFor={AUTH_INPUT_IDS.password}
          className={styles.label}
        >
          Password
        </label>
        <InputPassword
          id={AUTH_INPUT_IDS.password}
          name={AUTH_INPUT_IDS.password}
          required
        />
        <FormFieldError errors={state?.errors?.password} />
      </div>
      <div className={styles.field}>
        <label
          htmlFor={AUTH_INPUT_IDS.confirmPassword}
          className={styles.label}
        >
          Confirm Password
        </label>
        <InputPassword
          id={AUTH_INPUT_IDS.confirmPassword}
          name={AUTH_INPUT_IDS.confirmPassword}
          required
        />
        <FormFieldError errors={state?.errors?.confirmPassword} />
      </div>

      <div className={styles.field}>
        <Checkbox
          type='checkbox'
          id={AUTH_INPUT_IDS.rememberMe}
          name={AUTH_INPUT_IDS.rememberMe}
          defaultChecked
        >
          Remember me
        </Checkbox>
      </div>

      <div className={styles.field}>
        <Link href={paths.login}>Already have an account? Login here.</Link>
      </div>

      <Button
        type='primary'
        htmlType='submit'
        disabled={isPending}
        loading={isPending}
      >
        Submit
      </Button>
    </form>
  )
}
