import { FC, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { AuthContext } from './AuthContext'

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const user = useSelector((state: RootState) => {
    return state.auth.user
  })

  const logOut = () => [console.log('logout')]

  return (
    <AuthContext.Provider value={{ logOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
