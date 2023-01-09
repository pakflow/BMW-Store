import { FC, PropsWithChildren } from 'react'

import cn from 'classnames'

type DrawerProps = {
  open: boolean
  onClose: () => void
  content?: JSX.Element
  end?: boolean
}

const Drawer: FC<PropsWithChildren<DrawerProps>> = ({
  open,
  content,
  children,
  onClose,
  end,
}) => {
  return (
    <div className={cn('drawer', end && 'drawer-end')}>
      <input checked={open} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label onClick={onClose} className="drawer-overlay"></label>
        {content}
      </div>
    </div>
  )
}

export default Drawer
