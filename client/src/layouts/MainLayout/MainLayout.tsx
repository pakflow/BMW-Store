import { FC, PropsWithChildren } from 'react'

import { Cart } from '@components/Cart'
import { Drawer } from 'ui/Drawer'
import Header from './components/Header/Header'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  const openCartHandler = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const closeCartHandler = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener('BS:open_cart', openCartHandler)

    return () => {
      window.removeEventListener('BS:open_cart', openCartHandler)
    }
  }, [openCartHandler])

  return (
    <Drawer open={isCartOpen} onClose={closeCartHandler} end content={<Cart />}>
      <div>
        {/* Header */}
        <Header />
        {/* content */}
        <div className="mt-5">{children}</div>
      </div>
    </Drawer>
  )
}

export default MainLayout
