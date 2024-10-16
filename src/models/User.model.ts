export interface User {
  id: number
  firstname: string
  lastname: string
  username: string
  password: string
  rememberMe?: boolean
  isAdmin: boolean
  jsonWebToken?: string
  refreshTokens: string[]
}
