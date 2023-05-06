import { FC, PropsWithChildren, useCallback, useMemo } from 'react'
import { useModal, useThunkDispatch } from 'utils/hooks'
import { useEffect } from 'react'
import { Drawer, Modal } from 'ui'
import { Header } from 'layouts'
import { LoginForm, SignupForm, Cart, CheckoutForm } from '@components/index'
import { cartSelectors, cartSlice } from 'store/slices/cartSlice'
import { useSelector } from 'react-redux'
import { ProductEntity } from 'entities/ProductEntity'
import { userSelectors } from 'store/slices/authSlice'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen: isOpenCart, open: openCart, close: closeCart } = useModal()
  const { isOpen: isOpenAuth, open: openAuth, close: closeAuth } = useModal()
  const {
    isOpen: isOpenSignUp,
    open: openSignup,
    close: closeSignup,
  } = useModal()
  const {
    isOpen: isOpenCbeckout,
    open: openCheckout,
    close: closeCheckout,
  } = useModal()

  const dispacth = useThunkDispatch()

  const user = useSelector(userSelectors.user)
  const cartProducts = useSelector(cartSelectors.cartProducts)

  //DRY нарушается в AdminLayout
  const totalPrice = useMemo(() => {
    return cartProducts.reduce((acc, value) => {
      return acc + value.price
    }, 0)
  }, [cartProducts])

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

  useEffect(() => {
    window.addEventListener('BS:open_checkout', openCheckout)

    return () => {
      window.removeEventListener('BS:open_checkout', openCheckout)
    }
  }, [openCheckout])

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
          close={closeCart}
        />
      }
    >
      <div>
        <Modal open={isOpenAuth} onClose={closeAuth}>
          <LoginForm close={closeAuth} />
        </Modal>
        <Modal open={isOpenSignUp} onClose={closeSignup}>
          <SignupForm close={closeSignup} />
        </Modal>
        <Modal open={isOpenCbeckout} onClose={closeCheckout}>
          <CheckoutForm />
        </Modal>
        {/* Header */}
        <Header totalPrice={totalPrice} />
        {/* content */}
        <div className="w-full mt-5 px-4 flex justify-between">{children}</div>
      </div>
    </Drawer>
  )
}

export default MainLayout
