"use client"

import { Button, Form, Input, Switch } from "antd"

import FormItem from "antd/es/form/FormItem"
import TextArea from "antd/es/input/TextArea"
import Dragger from "antd/es/upload/Dragger"
import { InboxOutlined } from "@ant-design/icons"

import styles from "./post-create-form.module.scss"
import { usePostCreateForm } from "../model"
import { FORM_ITEM_LAYOUT, INPUT_IDS, VALIDATE_MESSAGES } from "../config"

export const PostCreateForm = () => {
  const { form, isLoading, uploadKey, onSubmit, onUpload, onRemoveFile } =
    usePostCreateForm()

  return (
    <Form
      className={styles.component}
      form={form}
      layout='vertical'
      validateMessages={VALIDATE_MESSAGES}
      onFinish={onSubmit}
      initialValues={{
        [INPUT_IDS.APPROVED]: false,
        [INPUT_IDS.PUBLISH]: true,
      }}
      {...FORM_ITEM_LAYOUT}
    >
      <FormItem
        name={INPUT_IDS.TITLE}
        label='Post title'
        rules={[{ required: true }]}
      >
        <Input disabled={isLoading} />
      </FormItem>
      <FormItem
        name={INPUT_IDS.DESCRIPTION}
        label='Post description'
        rules={[{ required: true }]}
      >
        <TextArea
          disabled={isLoading}
          rows={4}
        />
      </FormItem>
      <FormItem
        name={INPUT_IDS.APPROVED}
        label='Approved'
        valuePropName='checked'
      >
        <Switch disabled={isLoading} />
      </FormItem>
      <FormItem
        name={INPUT_IDS.PUBLISH}
        label='Publish'
        valuePropName='checked'
      >
        <Switch disabled={isLoading} />
      </FormItem>
      <FormItem>
        <Dragger
          key={uploadKey}
          name={INPUT_IDS.IMAGE}
          customRequest={onUpload}
          listType='picture'
          onRemove={onRemoveFile}
          maxCount={1}
          disabled={isLoading}
        >
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Support for a single or bulk upload.
          </p>
        </Dragger>
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
