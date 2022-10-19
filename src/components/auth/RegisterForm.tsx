import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { InputChange, FormSubmit } from '../../utils/TypeScript'
import { register } from '../../redux/actions/authActions'


const RegisterForm = () => {

  const initialState = { 
    'user[name]': '', 'user[email]': '', 'user[password]': ''
  }
  const [userRegister, setUserRegister] = useState(initialState)
  const [base, setBase] = useState<any>();

  const [typePass, setTypePass] = useState(false)

  const dispatch = useDispatch()

  const handleFileRead = (event: any) => {
    console.log('event', event)
    const file = event.target.files[0];
    setBase(file);
  };

  const handleChangeInput = (e: InputChange) => {
    console.log('e.target', e.target)
    const {value, name} = e.target
    setUserRegister({...userRegister, [name]:value})
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (base) {
      const newValue = {
        ...userRegister,
        'user[avatar]': base,
      };
      console.log('newValue', newValue)
      dispatch(register(newValue))
    }else{
      dispatch(register(userRegister))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">Name</label>

        <input type="text" className="form-control" id="name"
        name="user[name]" value={userRegister['user[name]']} onChange={handleChangeInput}
        placeholder="Your name is up to 20 chars." required/>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="user[email" className="form-label">
          Email
        </label>

        <input type="text" className="form-control" id="user[email"
        name="user[email]" value={userRegister['user[email]']} onChange={handleChangeInput}
        placeholder="Example@gmail.com" required/>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="user[password]" className="form-label">Password</label>

        <div className="pass">
          <input type={typePass ? "text" : "password"} 
          className="form-control" 
          id="user[password]"
          name="user[password]" value={userRegister['user[password]']} 
          onChange={handleChangeInput} 
          placeholder="Password must be at least 6 chars."
          required
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? 'Hide' : 'Show'}
          </small>
        </div>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="user[avatar]" className="form-label">
          Avatar
        </label>

        <div className="pass">
          <input
            id="user[avatar]"
            className="form-control" 
            type="file"
            name="user[avatar]"
            onChange={e => handleFileRead(e)}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-dark w-100 my-1">
        Register
      </button>
    </form>
  )
}

export default RegisterForm