import { AUTH, IAuth, IAuthType } from '../types/authTypes'


const authReducer = (state: IAuth = {}, action: IAuthType): IAuth => {
  console.log('auth action', action)
  switch (action.type){
    case AUTH:
      return action.payload
    default:
      return state
  }
}

export default authReducer