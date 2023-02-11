import { createContext, useContext } from 'react'
import { User } from 'firebase/auth'

type AuthContextPayload = {
  user: User | null
  logOut: () => void
}

export const AuthContext = createContext<AuthContextPayload | null>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}
