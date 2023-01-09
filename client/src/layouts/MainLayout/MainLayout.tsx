import { FC, PropsWithChildren, useMemo } from 'react'
import Sidebar from 'ui/Sidebar/Sidebar'
import useCartManager from 'utils/cart-manager/hooks/useCartManager'
import Navbar from './components/Navbar'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { getState, close, open } = useCartManager()

  const sidebarContent = useMemo(
    () => (
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        <li>
          <a>Sidebar Item 1</a>
        </li>
        <li>
          <a>Sidebar Item 2</a>
        </li>
      </ul>
    ),
    []
  )

  return (
    <div>
      <Sidebar
        open={getState().isOpen}
        onClose={close}
        content={sidebarContent}
      >
        <Navbar />
        <div>{children}</div>
      </Sidebar>
    </div>
  )
}

export default MainLayout
