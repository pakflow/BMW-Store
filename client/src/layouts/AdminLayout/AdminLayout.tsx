import { Header } from 'layouts'
import { FC, PropsWithChildren, useEffect } from 'react'
import { Modal } from 'ui'
import { useModal } from 'utils/hooks'
import { CreateCategoryForm } from './components'
import { CreateProductForm } from './components'

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
        <CreateProductForm />
      </Modal>
      <Modal open={isOpenCreateCategory} onClose={closeCreateCategory}>
        <CreateCategoryForm />
      </Modal>
      <Header />
      <div className="mt-5 px-4">{children}</div>
    </div>
  )
}

export default AdminLayout
