import Header from 'layouts/common/Header/Header'
import { FC, PropsWithChildren, useEffect } from 'react'
import { Modal } from 'ui/Modal'
import { useModal } from 'utils/hooks'
import CreateForm from './components/CreateForm'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, open, close } = useModal()

  useEffect(() => {
    window.addEventListener('BS:open_createProduct', open)

    return () => {
      window.removeEventListener('BS:open_createProduct', open)
    }
  }, [open])

  return (
    <div>
      <Modal open={isOpen} onClose={close}>
        <CreateForm />
      </Modal>
      <Header />
      <div className="mt-5 px-4 flex justify-between">{children}</div>
    </div>
  )
}

export default AdminLayout
