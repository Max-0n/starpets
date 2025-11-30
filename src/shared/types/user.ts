export interface User {
  balance: number
  login: string
  language: string
}

export interface LoginRequest {
  email: string
  password: string
  code2fa: string
}

export interface LoginResponse {
  balance: number
  login: string
  language: string
}
