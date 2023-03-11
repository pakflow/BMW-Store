import { FC, PropsWithChildren } from 'react'

import { Cart } from '@components/Cart'
import { Drawer } from 'ui/Drawer'
import Header from '../common/Header/Header'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal } from 'ui/Modal'
import LoginForm from '@components/LoginForm/LoginForm'
import SignupForm from '@components/SignupForm/SignupForm'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)

  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false)

  const openCartHandler = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const closeCartHandler = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const openAuthHandler = useCallback(() => {
    setIsAuthOpen(true)
  }, [])

  const closeAuthHandler = useCallback(() => {
    setIsAuthOpen(false)
  }, [])

  const openSignupHandler = useCallback(() => {
    setIsSignupOpen(true)
  }, [])

  const closeSignupHandler = useCallback(() => {
    setIsSignupOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener('BS:open_cart', openCartHandler)

    return () => {
      window.removeEventListener('BS:open_cart', openCartHandler)
    }
  }, [openCartHandler])

  useEffect(() => {
    window.addEventListener('BS:open_auth', openAuthHandler)

    return () => {
      window.removeEventListener('BS:open_auth', openAuthHandler)
    }
  }, [openAuthHandler])

  useEffect(() => {
    window.addEventListener('BS:open_signup', openSignupHandler)

    return () => {
      window.removeEventListener('BS:open_signup', openSignupHandler)
    }
  }, [openSignupHandler])

  return (
    <Drawer open={isCartOpen} onClose={closeCartHandler} end content={<Cart />}>
      <div>
        <Modal open={isAuthOpen} onClose={closeAuthHandler}>
          <LoginForm />
        </Modal>
        <Modal open={isSignupOpen} onClose={closeSignupHandler}>
          <SignupForm />
        </Modal>
        {/* Header */}
        <Header />
        {/* content */}
        <div className="mt-5 px-4 flex justify-between">{children}</div>
      </div>
    </Drawer>
  )
}

export default MainLayout
