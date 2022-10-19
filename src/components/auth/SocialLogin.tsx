import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import { gapi } from "gapi-script";

import { googleLogin } from '../../redux/actions/authActions'

const SocialLogin = () => {
  const dispatch = useDispatch()

  const client_id = "92982507762-i6pgpl66apvsdcdk1rcjde8e5r5uc8il.apps.googleusercontent.com"

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({client_id:client_id})
    });
  }, [])
  

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const access_token = googleUser.getAuthResponse().access_token
    console.log('googleUser', googleUser)
    dispatch(googleLogin(access_token))
  }

  const onFailure = (err: any) => {
    console.log(err)
  }

  return (
    <div className="my-2">
      <GoogleLogin 
      client_id={client_id}
      cookiepolicy='single_host_origin'
      onSuccess={onSuccess}
      onFailure={onFailure}
      />
    </div>
  )
}

export default SocialLogin