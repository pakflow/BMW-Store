import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import app from 'firebaseSetup'

const auth = getAuth(app)

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  return signOut(auth)
}
