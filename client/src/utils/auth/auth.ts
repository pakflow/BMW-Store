import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import app from 'firebaseSetup'

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const googleAuth = () => {
  try {
    signInWithPopup(auth, googleProvider).then((user) => {
      console.log(user)
    })
  } catch (error) {
    console.log(error)
  }
}

export const logout = () => {
  console.log(auth)
  return signOut(auth)
}
