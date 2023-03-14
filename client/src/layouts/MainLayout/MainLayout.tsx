import { FC, PropsWithChildren } from 'react'

import { Cart } from '@components/Cart'
import { Drawer } from 'ui/Drawer'
import Header from '../common/Header/Header'
import { useEffect } from 'react'
import { Modal } from 'ui/Modal'
import LoginForm from '@components/LoginForm/LoginForm'
import SignupForm from '@components/SignupForm/SignupForm'
import { useModal } from 'utils/hooks'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen: isOpenCart, open: openCart, close: closeCart } = useModal()
  const { isOpen: isOpenAuth, open: openAuth, close: closeAuth } = useModal()
  const {
    isOpen: isOpenSignUp,
    open: openSignup,
    close: closeSignup,
  } = useModal()

  useEffect(() => {
    window.addEventListener('BS:open_cart', openCart)

    return () => {
      window.removeEventListener('BS:open_cart', openCart)
    }
  }, [openCart])

  useEffect(() => {
    window.addEventListener('BS:open_auth', openAuth)

    return () => {
      window.removeEventListener('BS:open_auth', openAuth)
    }
  }, [openAuth])

  useEffect(() => {
    window.addEventListener('BS:open_signup', openSignup)

    return () => {
      window.removeEventListener('BS:open_signup', openSignup)
    }
  }, [openSignup])

  return (
    <Drawer open={isOpenCart} onClose={closeCart} end content={<Cart />}>
      <div>
        <Modal open={isOpenAuth} onClose={closeAuth}>
          <LoginForm />
        </Modal>
        <Modal open={isOpenSignUp} onClose={closeSignup}>
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
