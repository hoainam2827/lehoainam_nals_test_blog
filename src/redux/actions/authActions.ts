import { Dispatch } from 'redux'
import { AUTH, IAuthType } from '../types/authTypes'
import { ALERT, IAlertType } from '../types/alertType'

import { IUserLogin, IUserRegister } from '../../utils/TypeScript'
import { postAPI, getAPI, deleteAPI, deleteLogOutAPI, loginGoogleAPI } from '../../utils/FetchData'
import { validRegister } from '../../utils/Valid'
import { String } from 'lodash'


export const login = (userLogin: IUserLogin) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    const res = await postAPI('v2/login', userLogin)

    
    if(res.data.data.token){
      const accessToken = res.data.data.token;
      localStorage.setItem('access_token', accessToken);
      // getInfo(res.data.data.token)
      const profile = await getAPI('v2/me')
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.data.token,
          profile: profile.data.data
          // refresh_token: res.data.refresh_token
        }
      })
    }
    dispatch({ type: ALERT, payload: { success: "Login Success!" } })
  } catch (err: any) {
    // console.log(err.response.data.msg)
    dispatch({ type: ALERT, payload: { errors: "Login Fail!" } })
  }
}

// export const getInfo = (token: string) => 
// async (dispatch: Dispatch<IAuthType | IAlertType>) => {
//   console.log('token', token)
//   try {
//     const profile = await getAPI('v2/me')
//     dispatch({
//       type: AUTH,
//       payload: {
//         token,
//         profile: profile.data.data
//         // refresh_token: res.data.refresh_token
//       }
//     })
//   } catch (err: any) {
//     // console.log(err.response.data.msg)
//     dispatch({ type: ALERT, payload: { errors: "Get info Fail!" } })
//   }
// }



export const register = (userRegister: any) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const check = validRegister(userRegister)
  console.log('userRegister', userRegister)
  if(check.errLength > 0)
    return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const bodyFormData: any = new FormData();
    Object.keys(userRegister).forEach(key => {
      const value = userRegister[key];
      bodyFormData.append(key, value);
    });

    const res = await postAPI('v2/users', bodyFormData)

    dispatch({ type: ALERT, payload: { success: "Register Success!" } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const refreshToken = () => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const logged = localStorage.getItem('access_token')
  if(!logged) return;

  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('v2/refresh_tokens')

    dispatch({ type: AUTH, payload: res.data })

    dispatch({ type: ALERT, payload: { } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const logout = () => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    const logged = localStorage.getItem('access_token')
    if(!logged) return;
    await deleteLogOutAPI('v2/logout', logged)
    localStorage.removeItem('access_token')
    window.location.href = "/"
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const googleLogin = (access_token: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  console.log('access_token', access_token)
  const newValue = {
    access_token: access_token,
    token_type: 'Bearer'
  }
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('v2/login/google', newValue)

    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    console.log('res', res)
    const accessToken = res.data.data.token;
    localStorage.setItem('access_token', accessToken);

  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}