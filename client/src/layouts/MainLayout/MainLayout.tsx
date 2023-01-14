import { FC, PropsWithChildren } from 'react'

import { Cart } from '@components/Cart'
import { Drawer } from 'ui/Drawer'
import Header from './components/Header/Header'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal } from 'ui/Modal'
import Auth from '@components/Auth/Auth'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)

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

  return (
    <Drawer open={isCartOpen} onClose={closeCartHandler} end content={<Cart />}>
      <div>
        <Modal open={isAuthOpen} onClose={closeAuthHandler}>
          <Auth />
        </Modal>
        {/* Header */}
        <Header />
        {/* content */}
        <div className="mt-5">{children}</div>
      </div>
    </Drawer>
  )
}

export default MainLayout
