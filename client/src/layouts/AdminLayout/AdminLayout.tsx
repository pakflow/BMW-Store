import { Header } from 'layouts'
import { FC, PropsWithChildren, useEffect, useMemo } from 'react'
import { Modal } from 'ui'
import { useModal } from 'utils/hooks'
import { CreateCategoryForm } from './components'
import { CreateProductForm } from './components'
import { useSelector } from 'react-redux'
import { cartSelectors } from 'store/slices/cartSlice'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const {
    isOpen: isOpenCreateProduct,
    open: openCreateProduct,
    close: closeCreateProduct,
  } = useModal()

  const {
    isOpen: isOpenCreateCategory,
    open: openCreateCategory,
    close: closeCreateCategory,
  } = useModal()

  const cartProducts = useSelector(cartSelectors.cartProducts)

  //DRY нарушается в MainLayout
  const totalPrice = useMemo(() => {
    return cartProducts.reduce((acc, value) => {
      return acc + value.price
    }, 0)
  }, [cartProducts])

  useEffect(() => {
    window.addEventListener('BS:open_createProduct', openCreateProduct)

    return () => {
      window.removeEventListener('BS:open_createProduct', openCreateProduct)
    }
  }, [openCreateProduct])

  useEffect(() => {
    window.addEventListener('BS:open_createCategory', openCreateCategory)

    return () => {
      window.removeEventListener('BS:open_createCategory', openCreateCategory)
    }
  }, [openCreateCategory])

  return (
    <div>
      <Modal open={isOpenCreateProduct} onClose={closeCreateProduct}>
        <CreateProductForm close={closeCreateProduct} />
      </Modal>
      <Modal open={isOpenCreateCategory} onClose={closeCreateCategory}>
        <CreateCategoryForm close={closeCreateCategory} />
      </Modal>
      <Header totalPrice={totalPrice} />
      <div className="mt-5 px-4">{children}</div>
    </div>
  )
}

export default AdminLayout
