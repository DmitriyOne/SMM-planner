"use client"

import { AUTH_INPUT_IDS } from "../config"

import { Button, Checkbox, Input } from "antd"
import InputPassword from "antd/es/input/Password"

import { useLogin } from "../model/hooks"
import { FormFieldError } from "@/06_shared/ui"

import Link from "next/link"
import { paths } from "@/06_shared/config/routing"

import styles from "./styles.module.scss"

export const LoginForm = () => {
  const { formRef, state, isPending, formAction } = useLogin()

  return (
    <form
      ref={formRef}
      action={formAction}
      className={styles.form}
    >
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
        <Link
          href='#'
          className={styles.forgotLink}
          onClick={(e) => e.preventDefault()}
        >
          Forgot password?
        </Link>
      </div>

      <div className={styles.field}>
        <Link href={paths.register}>
          Don&apos;t have an account? Register here.
        </Link>
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
