export interface IJwtPayload {
  sub: string
  email: string
}

export interface IJwtValidateResponse {
  userId: string
  email: string
}
