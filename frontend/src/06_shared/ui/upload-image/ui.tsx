import { FC, PropsWithChildren } from "react"
import { UploadOutlined } from "@ant-design/icons"
import { Button, Upload } from "antd"
import { UploadRequestOption } from "rc-upload/lib/interface"

type TProps = {
  handleUpload: (option: UploadRequestOption) => void
  isShowUploadList?: boolean
  className?: string
  maxCount?: number
  isLoading?: boolean
} & PropsWithChildren

export const UploadImage: FC<TProps> = ({
  className,
  handleUpload,
  isShowUploadList,
  maxCount,
  isLoading,
  children,
}) => {
  return (
    <Upload
      customRequest={handleUpload}
      listType='picture'
      accept='image/*'
      className={className}
      showUploadList={isShowUploadList}
      maxCount={maxCount}
    >
      <Button
        type='primary'
        icon={<UploadOutlined />}
        disabled={isLoading}
      >
        {children}
      </Button>
    </Upload>
  )
}
