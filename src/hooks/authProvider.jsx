import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ token: null, user: null })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userJson = localStorage.getItem('user')
    try {
      const user = userJson ? JSON.parse(userJson) : null
      setAuthData({ token, user })
    } catch (error) {
      console.error('Failed to parse user data:', error)
    }
  }, [])

  const login = (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setAuthData({ token, user })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuthData({ token: null, user: null })
  }

  const authContextValue = {
    authToken: authData.token,
    user: authData.user,
    login,
    logout
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useAuth = () => useContext(AuthContext)