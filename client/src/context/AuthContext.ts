import { createContext, useContext } from 'react'
import { User } from 'firebase/auth'

type AuthContextPayload = {
  user: User | null
}

export const AuthContext = createContext<AuthContextPayload | null>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}
