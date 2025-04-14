import { Switch } from "antd"
import { SwitchSize } from "antd/es/switch"
import { FC } from "react"

type TProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  loading?: boolean
  className?: string
  size?: SwitchSize
}

export const Switcher: FC<TProps> = ({
  checked,
  onChange,
  loading,
  className,
  size = "small",
}) => {
  return (
    <Switch
      className={className}
      checked={checked}
      onChange={onChange}
      loading={loading}
      size={size}
    />
  )
}
