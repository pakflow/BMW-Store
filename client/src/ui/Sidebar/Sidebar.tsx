import { FC, PropsWithChildren } from 'react'

type SideBarProps = {
  open: boolean
  onClose: () => void
  content?: JSX.Element
}

const Sidebar: FC<PropsWithChildren<SideBarProps>> = ({
  open,
  onClose,
  content,
  children,
}) => {
  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer-4"
        checked={open}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label onClick={onClose} className="drawer-overlay"></label>
        {content}
      </div>
    </div>
  )
}

export default Sidebar
