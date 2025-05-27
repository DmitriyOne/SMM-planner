import Dragger from "antd/es/upload/Dragger"
import { INPUT_IDS } from "../config"
import { InboxOutlined } from "@ant-design/icons"
import { UploadRequestOption } from "rc-upload/lib/interface"
import { FC } from "react"

type TProps = {
  uploadKey: number
  onUpload: (option: UploadRequestOption) => void
  onRemoveFile: () => void
  isLoading: boolean
}

export const PostUploadField: FC<TProps> = ({
  uploadKey,
  isLoading,
  onRemoveFile,
  onUpload,
}) => {
  return (
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
      <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
    </Dragger>
  )
}
