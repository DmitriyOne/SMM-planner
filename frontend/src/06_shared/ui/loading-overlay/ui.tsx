import { FC } from "react"
import styles from "./styles.module.scss"
import classNames from "classnames"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { SpinSize } from "antd/es/spin"

type TProps = {
  className?: string
  size?: SpinSize
}

export const LoadingOverlay: FC<TProps> = ({ className, size = "small" }) => {
  const componentClassName = classNames(styles.component, className)

  return (
    <div className={componentClassName}>
      <Spin
        indicator={<LoadingOutlined spin />}
        size={size}
      />
    </div>
  )
}
