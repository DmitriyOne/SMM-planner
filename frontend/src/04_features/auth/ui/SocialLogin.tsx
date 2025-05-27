import { OAuthButton } from "@/06_shared/ui"
import { Divider } from "antd"
import { GoogleOutlined } from "@ant-design/icons"

export const SocialLogin = () => {
  return (
    <>
      <Divider plain>OR</Divider>
      <OAuthButton
        isDisabled
        label='Sign in with Google'
        icon={<GoogleOutlined />}
      />
    </>
  )
}
