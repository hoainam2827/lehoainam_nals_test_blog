// import { IUser } from '../../utils/TypeScript'

export const AUTH = 'AUTH'

export interface IAuth {
  token?: string
  profile?: any
  data?: any
  // refresh_token?: string
}

export interface IAuthType{
  type: typeof AUTH
  payload: IAuth
}