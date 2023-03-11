import Header from 'layouts/common/Header/Header'
import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { Modal } from 'ui/Modal'
import CreateForm from './components/CreateForm'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isCreateProductOpen, setIsCreateProductOpen] = useState<boolean>(false)

  const openCreateProductHandler = useCallback(() => {
    setIsCreateProductOpen(true)
  }, [])

  const closeCreateProductHandler = useCallback(() => {
    setIsCreateProductOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener('BS:open_createProduct', openCreateProductHandler)

    return () => {
      window.removeEventListener(
        'BS:open_createProduct',
        openCreateProductHandler
      )
    }
  }, [openCreateProductHandler])

  return (
    <div>
      <Modal open={isCreateProductOpen} onClose={closeCreateProductHandler}>
        <CreateForm />
      </Modal>
      <Header />
      <div className="mt-5 px-4 flex justify-between">{children}</div>
    </div>
  )
}

export default AdminLayout
