import { FC, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { AuthContext } from './AuthContext'
import { userSelectors } from 'store/slices/authSlice'

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const user = useSelector(userSelectors.user)

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider
