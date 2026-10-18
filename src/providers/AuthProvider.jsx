import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoCredentials, loginWithEmail, logoutUser, subscribeToAuth } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToAuth((nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      demoCredentials,
      login: async (email, password) => {
        const loggedInUser = await loginWithEmail(email, password)
        setUser(loggedInUser)
        return loggedInUser
      },
      logout: async () => {
        await logoutUser()
        setUser(null)
      },
    }),
    [loading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
