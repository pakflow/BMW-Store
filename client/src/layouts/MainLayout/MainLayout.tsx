import { FC, PropsWithChildren, useCallback } from 'react'
import { useModal, useThunkDispatch } from 'utils/hooks'
import { useEffect } from 'react'
import { Drawer, Modal } from 'ui'
import { Header } from 'layouts'
import { LoginForm, SignupForm, Cart } from '@components/index'
import { cartSelectors, cartSlice } from 'store/slices/cartSlice'
import { useSelector } from 'react-redux'
import { ProductEntity } from 'entities/ProductEntity'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen: isOpenCart, open: openCart, close: closeCart } = useModal()
  const { isOpen: isOpenAuth, open: openAuth, close: closeAuth } = useModal()
  const {
    isOpen: isOpenSignUp,
    open: openSignup,
    close: closeSignup,
  } = useModal()

  const dispacth = useThunkDispatch()

  const cartProducts = useSelector(cartSelectors.cartProducts)
  const totalPrice = useSelector(cartSelectors.totalPrice)

  const deletePosition = useCallback(
    (product: ProductEntity) => {
      dispacth(cartSlice.actions.removeFromCart(product))
    },
    [dispacth]
  )

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
    <Drawer
      open={isOpenCart}
      onClose={closeCart}
      end
      content={
        <Cart
          cartProducts={cartProducts}
          onDeletePosition={deletePosition}
          totalPrice={totalPrice}
        />
      }
    >
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
