"use client"

import { Button, Form, Input } from "antd"
import FormItem from "antd/es/form/FormItem"

import { FORM_ITEM_LAYOUT, INPUT_IDS, VALIDATE_MESSAGES } from "../config"
import { useTagCreateForm } from "../model"

import styles from "./tag-create-form.module.scss"

export const TagCreateForm = () => {
  const { form, isLoading, onSubmit } = useTagCreateForm()

  return (
    <Form
      className={styles.component}
      form={form}
      layout='vertical'
      validateMessages={VALIDATE_MESSAGES}
      onFinish={onSubmit}
      {...FORM_ITEM_LAYOUT}
    >
      <FormItem
        name={INPUT_IDS.TITLE}
        label='Tag title'
        rules={[{ required: true }]}
      >
        <Input disabled={isLoading} />
      </FormItem>
      <FormItem>
        <Button
          type='primary'
          htmlType='submit'
          disabled={isLoading}
        >
          Submit
        </Button>
      </FormItem>
    </Form>
  )
}
