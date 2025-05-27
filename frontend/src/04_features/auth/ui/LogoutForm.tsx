"use client"

import { Button } from "antd"
import { useLogout } from "../model/hooks"
import { logoutAction } from "../model/actions"

export const LogoutForm = () => {
  const { isLoading } = useLogout()

  return (
    <form action={logoutAction}>
      <Button
        type='primary'
        htmlType='submit'
        loading={isLoading}
      >
        Logout
      </Button>
    </form>
  )
}
