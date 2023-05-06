import { FC, PropsWithChildren, useMemo } from 'react'
import { Header } from 'layouts'
import { useSelector } from 'react-redux'
import { cartSelectors } from 'store/slices/cartSlice'

const ProductLayout: FC<PropsWithChildren> = ({ children }) => {
  const cartProducts = useSelector(cartSelectors.cartProducts)
  const totalPrice = useMemo(() => {
    return cartProducts.reduce((acc, value) => {
      return acc + value.price
    }, 0)
  }, [cartProducts])
  return (
    <>
      <Header totalPrice={totalPrice} />
      <div>{children}</div>
    </>
  )
}

export default ProductLayout
