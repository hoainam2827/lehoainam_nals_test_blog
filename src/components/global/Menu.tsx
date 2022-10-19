import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import { refreshToken, logout } from '../../redux/actions/authActions';
import { postAPI, getAPI } from '../../utils/FetchData'
import { AUTH, IAuthType } from '../../redux/types/authTypes'
import placeholder from '../../resource/image/avatar.jpeg'

const Menu = () => {
  const { auth } = useSelector((state: RootStore) => state)
  const token = localStorage.getItem('access_token');
  const dispatch = useDispatch()

  const { pathname } = useLocation()

  const bfLoginLinks = [
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' }
  ]

  const afLoginLinks = [
    { label: 'Home', path: '/' },
    { label: 'CreateBlog', path: '/create-blog' }
  ]

  useEffect(() => {
    if(token) {
      const fetchData = async () => {
        const profile = await getAPI('v2/me')
        dispatch({
          type: AUTH,
          payload: {
            token: token,
            profile: profile.data.data
          }
        })
      };
      fetchData()
    }
  }, [])
  

  // const navLinks = token ? afLoginLinks : bfLoginLinks
  const navLinks = token ? afLoginLinks : bfLoginLinks
  
  const isActive = (pn: string) => {
    if(pn === pathname) return 'active';
  }

  return (
    <ul className="navbar-nav ms-auto">
      {/* {
        bfLoginLinks.map((link, index) => (
          <li key={index} className="nav-item">
            <Link className="nav-link" to={link.path}>{link.label}</Link>
          </li>
        ))
      } */}
      {
        navLinks.map((link, index) => (
          <li key={index} className={`nav-item ${isActive(link.path)}`}>
            <Link className="nav-link" to={link.path}>{link.label}</Link>
          </li>
        ))
      }
      {
        token &&
        <li className="nav-item dropdown">
          <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={auth?.profile?.avatar?.url || placeholder} alt="avatar" className="avatar" />
          </span>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item" to="/"
              onClick={() => dispatch(logout())}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      }
      
    </ul>
  )
}

export default Menu