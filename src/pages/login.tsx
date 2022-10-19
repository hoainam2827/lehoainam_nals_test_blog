import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SocialLogin from '../components/auth/SocialLogin'

import LoginPass from '../components/auth/LoginPass'
import { RootStore } from '../utils/TypeScript'

const Login = () => {
  const history = useHistory()

  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if(auth?.token || auth?.data?.token) history.push('/')
  },[auth?.token, history, auth?.data?.token])

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>

        <SocialLogin />
        <LoginPass />

        <small className="row my-2 text-primary" style={{cursor: 'pointer'}}>
          <span className="col-6">
            <Link to='/forgot_password'>
              Forgot password?
            </Link>
          </span>

          <span className="col-6 text-end">
            Sign in with password
          </span>
        </small>

        <p>
        {`You don't have an account?`}
          <Link to={`/register`} style={{color: 'crimson'}}>
            Register Now
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login