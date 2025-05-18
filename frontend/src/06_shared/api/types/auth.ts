export type TLoginBody = {
  email: string
  password: string
}

export type TRegisterBody = TLoginBody & {
  name: string
}

export type TAuthResponse = {
  id: string
  accessToken: string
}
