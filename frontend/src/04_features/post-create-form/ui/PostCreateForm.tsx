"use client"

import { Button, Form, Input, Switch } from "antd"

import FormItem from "antd/es/form/FormItem"
import TextArea from "antd/es/input/TextArea"

import { usePostCreateForm, usePostTags, usePostUpload } from "../model"
import { FORM_ITEM_LAYOUT, INPUT_IDS, VALIDATE_MESSAGES } from "../config"
import { PostTagsField } from "./PostTagsField"
import { PostUploadField } from "./PostUploadField"

import styles from "./post-create-form.module.scss"

export const PostCreateForm = () => {
  const {
    tags,
    selectedTags,
    isTagsLoading,
    onToggleTag,
    onRemoveSelectedTags,
  } = usePostTags()
  const { file, uploadKey, onUpload, onRemoveFile } = usePostUpload()
  const { form, isLoading, onSubmit } = usePostCreateForm(
    file,
    selectedTags,
    onRemoveFile,
    onRemoveSelectedTags,
  )

  return (
    <Form
      className={styles.component}
      form={form}
      layout='vertical'
      validateMessages={VALIDATE_MESSAGES}
      onFinish={onSubmit}
      initialValues={{
        [INPUT_IDS.APPROVED]: false,
        [INPUT_IDS.PUBLISH]: false,
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
      <PostTagsField
        isLoading={isTagsLoading}
        tags={tags}
        selectedTags={selectedTags}
        onToggleTag={onToggleTag}
      />
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
        <PostUploadField
          isLoading={isLoading}
          uploadKey={uploadKey}
          onUpload={onUpload}
          onRemoveFile={onRemoveFile}
        />
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
